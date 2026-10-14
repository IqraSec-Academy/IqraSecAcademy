import { NextRequest, NextResponse } from 'next/server';
import {
  verifyWebhookSecret,
  validateSyncPayload,
  syncCertificateToDatabase,
} from '@/lib/certificates/sync-webhook';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // 1. Authenticate Request strictly via established Webhook Secret Header
    const secretHeader = req.headers.get('x-iqrasec-webhook-secret');

    if (!verifyWebhookSecret(secretHeader)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized request.' },
        { status: 401 }
      );
    }

    // 2. Parse JSON Request Body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request body.' },
        { status: 400 }
      );
    }

    // 3. Validate Request Payload
    const validation = validateSyncPayload(body);
    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { success: false, error: validation.error || 'Invalid request payload.' },
        { status: 400 }
      );
    }

    // 4. Synchronize Record to Supabase
    const result = await syncCertificateToDatabase(validation.data);

    if (!result.success) {
      // Log full diagnostic error details securely on server-side logs
      console.error('[Certificate Sync API Error]', result.error);
      return NextResponse.json(
        {
          success: false,
          error: result.message || 'Failed to synchronize certificate.',
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        certificate_id: result.certificate_id,
        action: result.action,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'An unexpected server error occurred.';
    console.error('[Certificate Sync API Exception]', errorMsg);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}


