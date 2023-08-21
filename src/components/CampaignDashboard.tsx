import React from "react";
import banner from "@assets/banner.png";
import badge from "@assets/badge.png";

import { useLocation } from "react-router-dom";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from "@project-serum/anchor";
import idl from "../idl.json";

const programID = new PublicKey(idl.metadata.address);
const network: string = clusterApiUrl("devnet");

const opts = {
  preflightCommitment: "processed",
};
const { SystemProgram } = web3;

const Icon = () => (
  <svg
    width="16"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.9997 0.333252C14.811 0.333252 12.6437 0.764348 10.6216 1.60193C8.59952 2.4395 6.7622
       3.66716 5.21456 5.21481C2.08896 8.34041 0.333008 12.5796 0.333008 16.9999C0.333008 21.4202 
       2.08896 25.6594 5.21456 28.785C6.7622 30.3327 8.59952 31.5603 10.6216 32.3979C12.6437 
       33.2355 14.811 33.6666 16.9997 33.6666C21.4199 33.6666 25.6592 31.9106 28.7848 28.785C31.9104
        25.6594 33.6663 21.4202 33.6663 16.9999C33.6663 14.8112 33.2352 12.644 32.3977 10.6219C31.5601 
        8.59977 30.3324 6.76245 28.7848 5.21481C27.2371 3.66716 25.3998 2.4395 23.3777 1.60193C21.3556
         0.764348 19.1884 0.333252 16.9997 0.333252ZM16.9997 3.66659C20.5359 3.66659 23.9273 5.07134 
         26.4278 7.57183C28.9282 10.0723 30.333 13.4637 30.333 16.9999C30.333 20.5361 28.9282 23.9275 
         26.4278 26.428C23.9273 28.9285 20.5359 30.3333 16.9997 30.3333C13.4635 30.3333 10.0721 28.9285 
         7.57158 26.428C5.0711 23.9275 3.66634 20.5361 3.66634 16.9999C3.66634 13.4637 5.0711 10.0723 
         7.57158 7.57183C10.0721 5.07134 13.4635 3.66659 16.9997 3.66659ZM16.9997 6.99992C14.3475 6.99992
          11.804 8.05349 9.92861 9.92885C8.05324 11.8042 6.99967 14.3478 6.99967 16.9999C6.99967 19.6521
           8.05324 22.1956 9.92861 24.071C11.804 25.9464 14.3475 26.9999 16.9997 26.9999C19.6518 26.9999
            22.1954 25.9464 24.0707 24.071C25.9461 22.1956 26.9997 19.6521 26.9997 16.9999C26.9997
             14.3478 25.9461 11.8042 24.0707 9.92885C22.1954 8.05349 19.6518 6.99992 16.9997 6.99992ZM16.9997
              10.3333C18.7678 10.3333 20.4635 11.0356 21.7137 12.2859C22.964 13.5361 23.6663 15.2318 23.6663 
              16.9999C23.6663 18.768 22.964 20.4637 21.7137 21.714C20.4635 22.9642 18.7678 23.6666 16.9997
               23.6666C15.2316 23.6666 13.5359 22.9642 12.2856 21.714C11.0354 20.4637 10.333 18.768 10.333 
               16.9999C10.333 15.2318 11.0354 13.5361 12.2856 12.2859C13.5359 11.0356 15.2316 10.3333 16.9997 
               10.3333Z"
      fill={"#6E6E6E"}
    />
  </svg>
);

const CampaignDashboard = () => {
  const location = useLocation();
  const { name, description, amountDonated, pubKey, admin, image } =
    location.state.campaign;
  console.log(pubKey, amountDonated / web3.LAMPORTS_PER_SOL);

  function getProvider() {
    const connection = new Connection(network, opts.preflightCommitment);
    const { solana }: any = window;
    const provider = new AnchorProvider(
      connection,
      solana,
      opts.preflightCommitment
    );
    return provider;
  }

  const getCampaign = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      const campaign = await program.account.campaign.fetch(pubKey);

      console.log(campaign);
      setAmtDonated(campaign.amountDonated / web3.LAMPORTS_PER_SOL);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdrawal = async () => {
    // if (parseInt(amountDonated) !== 10) throw Error
    const totalBalance: number = amountDonated;
    // if(parseInt(amountDonated)<10) alert('Campaign goal not yet reached');

    const [amtDonated, setAmtDonated] = useState(0);

    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      await program.methods
        .withdraw(new BN(totalBalance))
        .accounts({
          campaign: pubKey,
          user: provider.wallet.publicKey,
        })
        .rpc();

      alert(`you have successfully donated to ${name}`);
    } catch (error) {
      alert(`Error donating: ${error}`);
    }
  };

  useEffect(() => {
    getCampaign();
  }, [amtDonated]);

  return (
    <div className="bg-[#E9E8F1]/90 max-w-screen-lg mx-auto w-full h-full px-3 md:px-20 py-6 md:py-24 my:5 md:my-20">
      {/* banner */}

      <div className="w-full min-h-52 relative">
        <img src={banner} alt="banner" className="w-[900px] h-[300px]" />
        <img
          src={badge}
          alt="badge"
          className="w-10 lg:w-52 aspect-square absolute -bottom-6 md:-bottom-20 left-5 md:left-12"
        />
      </div>
      <p className="text-center mt-8 md:mt-4 lg:mt-2">
        <span className="text-lg font-bold">{name}</span> - Crowd Funding
        Project
      </p>
      {/* -mt-28 ml-16  */}

      <article className="mt-16 flex justify-between">
        <section>
          <h2 className="font-bold text-[#555353] text-lg">
            Campaign's Public Key
          </h2>
          <p>{pubKey.toString()}</p>
        </section>

        <section className="ml-10 ">
          <h2 className="font-bold text-[#555353] text-lg">Total Raised</h2>
          <div className="flex items-center gap-1 font-bold text-xl">
            <p className="text-[#555353] text-sm">
              {amtDonated.toString()} / 10 Sols
            </p>
          </div>
        </section>

        <button
          onClick={handleWithdrawal}
          className="bg-[#6F0694] w-1/6 text-center rounded-md cursor-pointer"
        >
          <h2 className="py-2 text-white">Withdraw</h2>
        </button>
      </article>

      {/*  */}
      <div>
        <h1 className="flex  w-fit rounded-md cursor-pointer">About</h1>
        <p>{description}</p>
        <h2 className="font-bold text-lg">Creator's Public key: {admin}</h2>
      </div>
    </div>
  );
};

export default CampaignDashboard;
