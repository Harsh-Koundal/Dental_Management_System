import { Clock, Instagram, Mail, Phone } from 'lucide-react';

export const APPOINTMENT_FEE = 100;

export const TIME_SLOTS = [
  '10:00 AM - 10:30 AM',
  '10:30 AM - 11:00 AM',
  '11:00 AM - 11:30 AM',
  '11:30 AM - 12:00 PM',
  '12:00 PM - 12:30 PM',
  '2:00 PM - 2:30 PM',
  '2:30 PM - 3:00 PM',
  '3:00 PM - 3:30 PM',
  '4:00 PM - 4:30 PM',
  '5:00 PM - 5:30 PM',
  '5:30 PM - 6:00 PM',
  '6:00 PM - 6:30 PM',
  '6:30 PM - 7:00 PM',
];

export const SERVICES = [
  'General check-up & cleaning',
  'Teeth whitening',
  'Braces / Orthodontics',
  'Root canal treatment',
  'Dental implants',
  'Tooth extraction',
  'Smile makeover',
  'Pediatric dentistry',
  'Other / Not sure yet',
];

export const BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Yes Bank',
  'Other',
];

export const UPI_APPS = ['GPay', 'PhonePe', 'Paytm', 'BHIM', 'Amazon Pay'];

export const CONTACTS = [
  { icon: Phone, label: 'Call us', value: '+91 93376 84288' },
  { icon: Mail, label: 'Email', value: 'drpanda@smile.com' },
  { icon: Clock, label: 'Clinic hours', value: 'Mon - Sat | 10 AM - 7 PM' },
];

export const INFO_CARDS = [
  {
    bg: 'bg-[#e1f5ee] border-[#9fe1cb]',
    text: 'text-[#085041]',
    sub: 'text-[#0f6e56]',
    title: 'New patients welcome',
    desc: 'No referral needed. Walk-ins accepted subject to availability.',
  },
  {
    bg: 'bg-[#faeeda] border-[#fac775]',
    text: 'text-[#412402]',
    sub: 'text-[#854f0b]',
    title: 'Cancellation policy',
    desc: 'Cancel at least 4 hours in advance to free the slot.',
  },
];

export const STEP_CONTENT = {
  1: {
    title: 'Your personal details',
    subtitle: 'We need a few basics to identify your booking.',
  },
  2: {
    title: 'Choose your appointment slot',
    subtitle: 'Pick a date and time that works for you.',
  },
  3: {
    title: 'Pay appointment fee',
    subtitle: 'Secure Rs 100 fee holds your slot. Adjusted against treatment.',
  },
};
