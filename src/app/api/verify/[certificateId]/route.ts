import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { verifyCertificate, GENERIC_VERIFICATION_FAILURE_MESSAGE } from '@/lib/certificates/verify-certificate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
): Promise<NextResponse> {
  try {
    // 1. Rate Limit Check
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const rateLimit = await checkRateLimit(`verify:${clientIp}`);

    if (!rateLimit.success) {
      return NextResponse.json(
        { verified: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Extract and Validate Certificate ID Parameter
    const resolvedParams = await params;
    const rawCertificateId = resolvedParams.certificateId || '';
    const certificateId = decodeURIComponent(rawCertificateId).trim();

    // 3. Validate Certificate ID
    if (!certificateId) {
      return NextResponse.json(
        { verified: false, message: GENERIC_VERIFICATION_FAILURE_MESSAGE },
        { status: 400 }
      );
    }

    // 4. Perform Lookup by Certificate ID
    const result = await verifyCertificate(certificateId);
    const diag = result._diag;
    delete result._diag;

    if (diag) {
      console.log('[CertDiag]', JSON.stringify(diag));
    }

    const isInspect = req.headers.get('x-debug-inspect') === '1';

    if (!result.verified || !result.certificate) {
      return NextResponse.json(
        { verified: false, message: GENERIC_VERIFICATION_FAILURE_MESSAGE },
        {
          status: 404,
          headers: {
            'Cache-Control': 'no-store, max-age=0, must-revalidate',
            ...(isInspect && diag ? { 'x-cert-diag': Buffer.from(JSON.stringify(diag)).toString('base64') } : {}),
          },
        }
      );
    }

    // 5. Return EXCLUSIVELY the Approved Minimal Fields
    const publicCertificate = {
      certificate_id: result.certificate.certificateId,
      intern_name: result.certificate.recipientName,
      recipient_name: result.certificate.recipientName,
      domain: result.certificate.domain,
      internship_start_date: result.certificate.internshipStartDate,
      internship_end_date: result.certificate.internshipEndDate,
      verification_url: result.certificate.verificationUrl,
    };

    return NextResponse.json(
      {
        verified: true,
        certificate: publicCertificate,
        message: result.message,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
          ...(isInspect && diag ? { 'x-cert-diag': Buffer.from(JSON.stringify(diag)).toString('base64') } : {}),
        },
      }
    );
  } catch {
    return NextResponse.json(
      { verified: false, message: GENERIC_VERIFICATION_FAILURE_MESSAGE },
      { status: 500 }
    );
  }
}
