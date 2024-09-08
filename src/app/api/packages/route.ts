// pages/api/packages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/lib'; // تأكد من مسار الاستيراد الصحيح

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const packages = await prisma.package.findMany();
    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error); // تسجيل الخطأ لمزيد من المعلومات
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
