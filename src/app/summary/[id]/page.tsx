// app/summary/[id]/page.tsx
import prisma from '@/lib/lib'; // تأكد من صحة مسار الاستيراد
import { notFound } from 'next/navigation';
import React from 'react';

interface SummaryProps {
  params: {
    id: string;
  };
}

const Summary: React.FC<SummaryProps> = async ({ params }) => {
  const { id } = params;

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, package: true },
    });

    if (!subscription) {
      return notFound(); // يعرض صفحة 404 إذا لم يتم العثور على الاشتراك
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">ملخص الاشتراك</h1>
        </header>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">معلومات المستخدم:</h2>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-medium">الاسم: {subscription.user.name}</p>
            <p className="text-lg">البريد الإلكتروني: {subscription.user.email}</p>
          </div>
          <h2 className="text-2xl font-semibold mb-4">معلومات الحزمة:</h2>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-medium">اسم الحزمة: {subscription.package.name}</p>
            <p className="text-lg">سعر أساسي: {subscription.package.basePrice} {subscription.package.currency}</p>
            <p className="text-lg">سعر سنوي: {subscription.package.annualPrice} {subscription.package.currency}</p>
            <p className="text-lg">سعر شهري: {subscription.package.monthlyPrice} {subscription.package.currency}</p>
          </div>
          <h2 className="text-2xl font-semibold mb-4">معلومات الاشتراك:</h2>
          <div className="p-4 bg-gray-50 rounded-lg">

            <p className="text-lg">نوع الاشتراك: {subscription.type}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching subscription:', error); // تسجيل الخطأ لمزيد من المعلومات
    return <p>حدث خطأ أثناء تحميل البيانات.</p>;
  }
};

export default Summary;
