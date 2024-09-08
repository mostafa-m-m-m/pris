// pages/api/subscription/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/lib';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // استخراج الـ ID من مسار URL

  if (id && !isNaN(Number(id))) {
    try {
      const subscription = await prisma.subscription.findUnique({
        where: { id: parseInt(id) },
        include: { user: true, package: true },
      });

      if (subscription) {
        return NextResponse.json(subscription);
      } else {
        return NextResponse.json({ error: 'لا يوجد اشتراك مرتبط بالحزمة' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error); // تسجيل الخطأ لمزيد من المعلومات
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
}
