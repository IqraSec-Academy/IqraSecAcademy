import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { verifyCertificate, GENERIC_VERIFICATION_FAILURE_MESSAGE } from '@/lib/certificates/verify-certificate';
import { CertificateVerificationResponse } from '@/types/certificate';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function POST(req: NextRequest): Promise<NextResponse<CertificateVerificationResponse>> {
  try {
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const rateLimit = await checkRateLimit(`verify:${clientIp}`);
    if (!rateLimit.success) {
      return NextResponse.json(
        { verified: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    let body: { certificateId?: string; id?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { verified: false, message: GENERIC_VERIFICATION_FAILURE_MESSAGE },
        { status: 400 }
      );
    }

    const certificateId = body?.certificateId || body?.id;

    if (!certificateId || typeof certificateId !== 'string' || certificateId.trim() === '') {
      return NextResponse.json(
        { verified: false, message: GENERIC_VERIFICATION_FAILURE_MESSAGE },
        { status: 400 }
      );
    }

    const result = await verifyCertificate(certificateId);
    const diag = result._diag;
    delete result._diag;

    if (diag) {
      console.log('[CertDiag]', JSON.stringify(diag));
    }

    const isInspect = req.headers.get('x-debug-inspect') === '1';

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        ...(isInspect && diag ? { 'x-cert-diag': Buffer.from(JSON.stringify(diag)).toString('base64') } : {}),
      },
    });
  } catch {
    return NextResponse.json(
      { verified: false, message: GENERIC_VERIFICATION_FAILURE_MESSAGE },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest): Promise<NextResponse<CertificateVerificationResponse>> {
  try {
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const rateLimit = await checkRateLimit(`verify:${clientIp}`);
    if (!rateLimit.success) {
      return NextResponse.json(
        { verified: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const certificateId = searchParams.get('id') || searchParams.get('certificate_id') || searchParams.get('certificate');

    if (!certificateId || certificateId.trim() === '') {
      return NextResponse.json(
        { verified: false, message: GENERIC_VERIFICATION_FAILURE_MESSAGE },
        { status: 400 }
      );
    }

    const result = await verifyCertificate(certificateId);
    const diag = result._diag;
    delete result._diag;

    if (diag) {
      console.log('[CertDiag]', JSON.stringify(diag));
    }

    const isInspect = req.headers.get('x-debug-inspect') === '1';

    return NextResponse.json(result, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        ...(isInspect && diag ? { 'x-cert-diag': Buffer.from(JSON.stringify(diag)).toString('base64') } : {}),
      },
    });
  } catch {
    return NextResponse.json(
      { verified: false, message: GENERIC_VERIFICATION_FAILURE_MESSAGE },
      { status: 500 }
    );
  }
}
