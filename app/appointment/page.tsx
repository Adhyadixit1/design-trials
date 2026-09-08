import {ContactPage} from '../site/pages';
export const metadata={title:'Request an Appointment | Carroll’s Garage',description:'Arrange automotive service with Carroll’s Garage in Sumner, WA.',openGraph:{images:[]},twitter:{images:[]}};
export default async function Appointment({searchParams}:{searchParams:Promise<{service?:string}>}){const {service}=await searchParams;return <ContactPage appointment service={service??''}/>;}
