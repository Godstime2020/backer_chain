import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";

import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from "@project-serum/anchor";

import logo from "../../src/assets/logo.png";
import idl from "../idl.json";

import Modal from "react-modal";
import metamask from "../svgs/metamask.svg";
import phantom from "../svgs/phantom_wallet.svg";

import coinbase from "../svgs/coinbase.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: 12,
    marginRight: "-50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
  },
};


const programID = new PublicKey(idl.metadata.address);
const network: string = clusterApiUrl("devnet");

const opts = {
  preflightCommitment: "processed",
};
const { SystemProgram } = web3;

function Header() {

  const [action, setAction] = useState('');
  const [walletAddress, setWalletAddress] = useState('')

  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }


  const [toggleNav, setToggleNav] = useState(true);
  const toggleNavFunction: any = () => {
    setToggleNav((prev) => !prev);
  };

  const { pathname } = useLocation();
  const [login, setLogin] = useState<boolean>(false);
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
      const connection = new Connection(network, opts.preflightCommitment);

      const provider = getProvider();
      const program = new Program(idl, programID, provider);

       return await Promise.all(
        (await connection.getProgramAccounts(programID)).map(
          async (campaign) => ({
            ...(await program.account.campaign.fetch(campaign.pubkey)),
            pubKey: campaign.pubkey,
            image:'/cp3.png'
          })
        )
      )

    } catch (error) {}
  };

  const handleConnectWallet = async () => {
    const { solana }: any = window;

    if (solana) {
      const response = await solana.connect();

      setWalletAddress(response.publicKey.toString());
      try {
          const campaigns = await getCampaign();
      console.log(campaigns);

      const campaign = campaigns.filter((campaign)=>{
        return campaign.admin.toString() === response.publicKey.toString()
      });

      console.log(campaign);

      navigate("/campaign_dashboard", {state:{campaign: {
        name: campaign[0].name,
        pubKey: campaign[0].pubKey.toString(),
        amountDonated: (campaign[0].amountDonated / web3.LAMPORTS_PER_SOL).toString(),
        admin: campaign[0].admin.toString(),
        description: campaign[0].description
       }}});

      } catch (error) {
        alert('Check your Internet connection!')
      }




      
    }

    setIsOpen(false);

  };



  // alert(pathname)
  useEffect(() => {
    if (pathname === "/login") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {login && (
        <>
          <Link
            to={"/"}
            className="bg-[#6F0694] rounded-full flex-shrink-0 tracking-wide text-slate-50 font-[600] px-4 py-1 w-[150px] absolute z-10 right-12  sm:top-5 md:top-5 top-3"
          >
            Connect Wallet
          </Link>
        </>
      )}

<div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <section>
            <article className="flex px-6 py-4 border-b rounded-t">
              <h3 className="text-base flex-1 font-semibold text-gray-900 lg:text-xl dark:text-white">
                Connect your Wallet
              </h3>
              <span
                onClick={closeModal}
                className="inline-flex cursor-pointer items-center justify-center px-2 py-0.5 ml-3 text-xl font-bold text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
              >
                X
              </span>
            </article>
            <section className="p-6">
              <p className="text-sm text-center font-normal text-gray-500 dark:text-gray-400">
                Connect with your wallet to log in
              </p>

              <ul className="my-4 space-y-3">
                <li>
                  <a
                    onClick={handleConnectWallet}
                    className="flex items-center mt-4 cursor-pointer p-3 bg-gray-300 rounded-md"
                  >
                    <img src={phantom} width={"10%"} />
                    <figcaption className="ml-4 flex-1 whitespace-nowrap">
                      Phantom wallet
                    </figcaption>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                      Popular
                    </span>
                  </a>
                </li>

                {/* <li>
                  <a
                    href="#"
                    className="flex mt-7 items-center cursor-pointer p-3 bg-gray-300 rounded-md"
                  >
                    <img src={metamask} width={"10%"} alt="metamask_logo"></img>
                    <figcaption className="ml-4 hover:text-sm">
                      MetaMask
                    </figcaption>
                  </a>
                </li> */}

                {/* <li>
                  <a
                    href="#"
                    className="flex mt-7 items-center cursor-pointer p-3 bg-gray-300 rounded-md"
                  >
                    <img src={coinbase} width={"10%"} alt="coin_base"></img>
                    <figcaption className="ml-4 hover:text-sm">
                      Coin base
                    </figcaption>
                  </a>
                </li> */}
              </ul>
            </section>
          </section>
        </Modal>
      </div>

      <div
        className={`header relative w-full py-0 px-8 flex justify-between items-center bg-[#E8E8F1] border-[1px] border-solid border-blue-600`}
      >
        <div className=" p-2 flex gap-2 items-center">
          <svg
            onClick={() => toggleNavFunction()}
            width="38"
            className="sm:hidden"
            height="25"
            viewBox="0 0 38 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="1.5" x2="38" y2="1.5" stroke="#E9E9F2" strokeWidth="3" />
            <line
              y1="12.5"
              x2="38"
              y2="12.5"
              stroke="#E9E9F2"
              strokeWidth="3"
            />
            <line
              y1="23.5"
              x2="38"
              y2="23.5"
              stroke="#E9E9F2"
              strokeWidth="3"
            />
          </svg>

          <Link to={"/"} style={{ cursor: "pointer" }}>
            <img src={logo} alt="backerchain logo" className=" w-34 h-10" />
          </Link>
        </div>

        <div
          className={`${toggleNav ? "" : "hidden"} ${
            login ? "opacity-0" : ""
          } sm:flex items-center input-container`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9167 9.66667H10.2583L10.025 9.44167C10.8417 8.49167 11.3333 7.25833 11.3333 5.91667C11.3333 2.925 8.90833 0.5 5.91667 0.5C2.925 0.5 0.5 2.925 0.5 5.91667C0.5 8.90833 2.925 11.3333 5.91667 11.3333C7.25833 11.3333 8.49167 10.8417 9.44167 10.025L9.66667 10.2583V10.9167L13.8333 15.075L15.075 13.8333L10.9167 9.66667ZM5.91667 9.66667C3.84167 9.66667 2.16667 7.99167 2.16667 5.91667C2.16667 3.84167 3.84167 2.16667 5.91667 2.16667C7.99167 2.16667 9.66667 3.84167 9.66667 5.91667C9.66667 7.99167 7.99167 9.66667 5.91667 9.66667Z"
              fill="black"
            />
          </svg>

          <input
            type="text"
            placeholder="Discover New Projects"
            className="hidden sm:block px-2 outline-none"
          />
        </div>

        <div
          className={`${toggleNav ? "" : "hidden"} ${
            login ? "opacity-0" : ""
          } p-4 sm:flex items-center gap-2`}
        >
          {/* 
        <Link to={''}
         className="link border-l-[2px] tracking-wide relative -py-10 px-2 pb-1 underline underline-offset-2 text-slate-50 sm:text-[#393939] font-[600] text-[16px]">
          Connect Wallet
        </Link> */}

          <button
            onClick={()=>{
              setIsOpen(true);
            }}
            className="bg-[#6F0694] rounded-full flex-shrink-0 tracking-wide text-slate-50 font-[600] px-4 py-1"
          >
            Log In
          </button>
        </div>
      </div>
      <Outlet  />

      <Footer />
    </div>
  );
}

export default Header;
