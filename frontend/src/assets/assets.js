import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.jpg'
import about_image from './about_image.jpg'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import worker1 from './worker1.png'
import worker2 from './worker2.png'
import worker3 from './worker3.png'
import worker4 from './worker4.png'
import worker5 from './worker5.png'
import worker6 from './worker6.png'
import Painting from './painting.svg'
import Electric from './electric.svg'
import Cleaning from './cleaning.svg'
import Repair from './Repair.svg'
import Plumbing from './plumbing.svg'
import Shifting from './shifting.svg'

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
}

export const specialityData = [
  {
    speciality: 'Cleaning',
    image: Cleaning,
  },
  {
    speciality: 'Repair',
    image: Repair,
  },
  {
    speciality: 'Painting',
    image: Painting,
  },
  {
    speciality: 'Shifting',
    image: Shifting,
  },
  {
    speciality: 'Plumbing',
    image: Plumbing,
  },
  {
    speciality: 'Electric',
    image: Electric,
  },
]

export const workers = [
  {
    _id: 'worker1',
    name: 'Mr. John Smith',
    image: worker1,
    speciality: 'Cleaning',
    experience: '5 Years',
    about:
      'John specializes in professional cleaning services, ensuring spotless and hygienic spaces with precision and care.',
    fees: 20,
    address: {
      line1: '10th Cross, Downtown',
      line2: 'City Center, London',
    },
  },
  {
    _id: 'worker2',
    name: 'Mr. Richard James',
    image: worker2,
    speciality: 'Repair',
    experience: '7 Years',
    about:
      'Richard is a skilled repairman, adept at fixing household appliances and ensuring their long-lasting functionality.',
    fees: 30,
    address: {
      line1: '12th Cross, East Side',
      line2: 'Circle Road, London',
    },
  },
  {
    _id: 'worker3',
    name: 'Ms. Susan Lee',
    image: worker3,
    speciality: 'Painting',
    experience: '4 Years',
    about:
      'Susan is an expert in painting and decoration, bringing vibrant colors and fresh looks to your spaces.',
    fees: 25,
    address: {
      line1: '15th Cross, South Block',
      line2: 'Ring Road, London',
    },
  },
  {
    _id: 'worker4',
    name: 'Mr. George Brown',
    image: worker4,
    speciality: 'Shifting',
    experience: '6 Years',
    about:
      'George offers efficient and reliable shifting services, ensuring safe transportation of your belongings.',
    fees: 35,
    address: {
      line1: '20th Cross, West End',
      line2: 'Park Avenue, London',
    },
  },
  {
    _id: 'worker5',
    name: 'Mr. Peter Wilson',
    image: worker5,
    speciality: 'Plumbing',
    experience: '8 Years',
    about:
      'Peter is a seasoned plumber, resolving water and drainage issues with expertise and efficiency.',
    fees: 40,
    address: {
      line1: '25th Cross, North Lane',
      line2: 'Main Street, London',
    },
  },
  {
    _id: 'worker6',
    name: 'Ms. Emma Davis',
    image: worker6,
    speciality: 'Electric',
    experience: '3 Years',
    about:
      'Emma provides expert electrical services, ensuring safety and functionality for your home or office.',
    fees: 50,
    address: {
      line1: '30th Cross, Uptown',
      line2: 'Central Avenue, London',
    },
  },
  {
    _id: 'worker7',
    name: 'Ms. Davis Emma',
    image: worker2,
    speciality: 'Electric',
    experience: '3 Years',
    about:
      'Emma provides expert electrical services, ensuring safety and functionality for your home or office.',
    fees: 50,
    address: {
      line1: '30th Cross, Uptown',
      line2: 'Central Avenue, London',
    },
  },
]
