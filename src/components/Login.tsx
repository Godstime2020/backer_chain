import crypto from '/CryptoWallet.png'
export default function Login() {
  return (
    <div className='flex items-center justify-center p-[3rem] '>
      <div className=" min-w-[860px] h-[500px] bg-[#E8E8F1] flex flex-col flex-shrink-0 items-center justify-center">
        <img src={crypto} className='w-58 h-1/2'/>

        <div className="flex flex-col text-center">
          <h1 className='font-[600] text-[#252525] text-3xl cursor-pointer'>Connect Wallet</h1>
          <p className='font-[600] text-[#555353] text-[13px]'>To See Your Dashboard</p>
        </div>
      </div>
    </div>
  )
}
