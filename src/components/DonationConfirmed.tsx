import React from 'react'

export default function DonationConfirmed() {
  return (
    <div className='flex items-center justify-center p-[3rem] '>
      <div className=" min-w-[860px] h-contain py-[1rem] bg-[#E8E8F1] flex flex-col flex-shrink-0 items-center justify-center border-[1px] border-[#393939]/50 rounded-sm">
          <svg className="w-[152px]" xmlns="http://www.w3.org/2000/svg" width="252" height="252" viewBox="0 0 252 252" fill="none">
              <path d="M126 0C159.417 0 191.466 13.275 215.095 36.9045C238.725 60.5341 252 92.5827 252 126C252 159.417 238.725 191.466 215.095 215.095C191.466 238.725 159.417 252 126 252C92.5827 252 60.5341 238.725 36.9045 215.095C13.275 191.466 0 159.417 0 126C0 92.5827 13.275 60.5341 36.9045 36.9045C60.5341 13.275 92.5827 0 126 0ZM110.304 150.858L82.314 122.85C81.3106 121.847 80.1193 121.051 78.8083 120.508C77.4972 119.964 76.0921 119.685 74.673 119.685C73.2539 119.685 71.8488 119.964 70.5377 120.508C69.2267 121.051 68.0354 121.847 67.032 122.85C65.0055 124.877 63.867 127.625 63.867 130.491C63.867 133.357 65.0055 136.105 67.032 138.132L102.672 173.772C103.673 174.78 104.863 175.581 106.174 176.127C107.486 176.673 108.892 176.955 110.313 176.955C111.734 176.955 113.14 176.673 114.452 176.127C115.763 175.581 116.953 174.78 117.954 173.772L191.754 99.954C192.771 98.9547 193.58 97.764 194.134 96.4506C194.688 95.1371 194.977 93.7269 194.984 92.3012C194.991 90.8756 194.715 89.4627 194.173 88.1442C193.631 86.8256 192.833 85.6274 191.825 84.6188C190.818 83.6101 189.621 82.8108 188.303 82.2672C186.985 81.7235 185.572 81.4461 184.147 81.4511C182.721 81.456 181.31 81.7432 179.996 82.296C178.682 82.8488 177.49 83.6563 176.49 84.672L110.304 150.858Z" fill="#4ECB71"/>
          </svg>

          <div className="flex flex-col text-center">
            <h2 className="text-[#333232] text-[30px] tracking-wider font-[500]">Donation Successful!!</h2>
            <h1 className="text-[#333232] text-[30px] tracking-tight font-[500]">
              <span className='text-[#6E6E6E] text-[30px] font-[600] tracking-tight'>SOL </span> 2.00
            </h1>
          </div>

          <div className="mt-10 mb-4 w-[750px] leading-[1.9] text-center tracking-wide">
            <p className='font-[600] text-[17px]'>Thank you for donating to <span className='text-[#0A07B0]'>Food Compass - Store extension
project.</span> Because of your generosity, we will be able to extend our fruit store
and serve you better. If you have any questions, please don’t hesitate to
contact or e-mail <span className='text-[#0A07B0]'>FoodCompass@gmail.com</span></p>
          </div>
      </div>
    </div>
  )
}
