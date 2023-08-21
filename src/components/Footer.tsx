import logo from "@assets/logo.png"
import { ReactNode } from "react"

interface IItem {
    title: string,
    isAddress?: ReactNode
}


function Footer() {

    const Icon = () => (
        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_132_2403)">
                <path d="M7.49998 8.57129H3.21427C2.0308 8.57129 1.07141 9.53068 1.07141 10.7141V19.2856C1.07141 20.469 2.0308 21.4284 3.21427 21.4284H7.49998C8.68345 21.4284 9.64284 20.469 9.64284 19.2856V10.7141C9.64284 9.53068 8.68345 8.57129 7.49998 8.57129Z" stroke="#6F0694" strokeWidth="4.28571" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M26.7857 8.57129H22.5C21.3166 8.57129 20.3572 9.53068 20.3572 10.7141V19.2856C20.3572 20.469 21.3166 21.4284 22.5 21.4284H26.7857C27.9692 21.4284 28.9286 20.469 28.9286 19.2856V10.7141C28.9286 9.53068 27.9692 8.57129 26.7857 8.57129Z" stroke="#6F0694" strokeWidth="4.28571" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.64282 15H20.3571" stroke="#6F0694" strokeWidth="4.28571" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_132_2403">
                    <rect width="30" height="30" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )

    const Item = ({ title, isAddress = false }: IItem) => (
        <li className="mt-3 flex gap-3 items-center">
            {!isAddress && <Icon />}
            <p className="text-[#F6EEEE] cursor-pointer hover:text-white">{title}</p>
        </li>
    )


    return (
        <div className="mt-auto">
            <footer className="w-full text-gray-700 bg-[#696767] body-font">
                <div
                    className="container flex flex-col flex-wrap px-5 py-6 mx-auto md:items-center md:flex-row md:flex-no-wrap">

                    <div className="flex-shrink-0 md:w-1/3 mx-auto justify-center flex flex-col text-center md:text-left">
                        <img src={logo} alt="logo" className="w-auto h-16 object-contain" />
                        <p className="mt-2 text-sm px-10 text-[#F6EEEE]">Backer is a crowdfunding app for SMEs and Start-ups. It allows for global payments at lower rates..</p>
                    </div>


                    <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left justify-center">
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-medium tracking-widest text-[#F6EEEE] uppercase title-font">COMPANY</h2>
                            <nav className="mb-10 list-none">
                                <Item title="About Us" />
                                <Item title="History" />
                                <Item title="Update & News" />
                            </nav>
                        </div>
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-medium tracking-widest text-[#F6EEEE] uppercase title-font">SUPPORT</h2>
                            <nav className="mb-10 list-none">
                                <Item title="Contact Us" />
                                <Item title="Faq" />
                                <Item title="Account" />
                                <Item title="Terms and service" />
                            </nav>
                        </div>
                        <div className="w-full px-4 lg:w-1/4 md:w-1/2">
                            <h2 className="mb-3 text-sm font-medium tracking-widest text-[#F6EEEE] uppercase title-font">ADDRESS</h2>
                            <nav className="mb-10 list-none">
                                <Item isAddress={true} title="32, George cole estate, Miami FL, USA" />
                                <Item isAddress={true} title="BackerCrowdfund@gmail.com" />
                                <Item isAddress={true} title="+123 4567 9871" />
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer;