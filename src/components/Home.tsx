import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import metamask from "../svgs/metamask.svg";
import phantom from "../svgs/phantom_wallet.svg";
import coinbase from "../svgs/coinbase.svg";

import { modalStyles as customStyles } from "@/utils/constants";

Modal.setAppElement("#root");

export default function Home(): JSX.Element {
  const [action, setAction] = useState("");

  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function closeWalletModal() {
    setIsOpen(false);
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana }: any = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("phantom wallet found!");
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "connected with public key: ",
            response.publicKey.toString()
          );
        }
      } else {
        console.log("wallet not found!");
      }
    } catch (error) {}
  };

  const handleConnectWallet = async () => {
    const { solana }: any = window;

    if (solana) {
      try {
        const response = await solana.connect();
        console.log(response.publicKey.toString());
      } catch (error) {
        alert(`please check your Internet Connection`);
      }

    } else {
      alert("Please install phantom wallet extension");
    }
    if (action === "/register") {
      navigate("/register");
    } else {
      navigate("/campaign-list");
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <section className="flex flex-col gap-8 items-center w-full py-[8rem] h-contain justify-center">
      <article className="shadow-md px-14 py-8 rounded-md bg-[#FFFFFF]/80 text-center">
        <h1 className="text-[#252525] text-[40px] font-[700] leading-[1.5] tracking-wide ">
          Funding Without Barriers.
        </h1>
        <p className="text-[#333232] font-[500] tracking-wide text-[16px]">
          Invest and Receive Business Funds in Less Time.
        </p>
      </article>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeWalletModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <section>
          <article className="flex px-6 py-4 border-b rounded-t">
            <h3 className="text-base flex-1 font-semibold text-gray-900 lg:text-xl dark:text-white">
              Connect your Wallet
            </h3>
            <span
              onClick={closeWalletModal}
              className="inline-flex cursor-pointer items-center justify-center px-2 py-0.5 ml-3 text-xl font-bold text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400"
            >
              X
            </span>
          </article>
          <section className="p-6">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Connect with one of our available wallet providers
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
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-red-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                    recommended
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex mt-7 items-center cursor-pointer p-3 bg-gray-300 rounded-md"
                >
                  <img src={metamask} width={"10%"} alt="metamask_logo"></img>
                  <figcaption className="ml-4 hover:text-sm">
                    MetaMask
                  </figcaption>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex mt-7 items-center cursor-pointer p-3 bg-gray-300 rounded-md"
                >
                  <img src={coinbase} width={"10%"} alt="coin_base"></img>
                  <figcaption className="ml-4 hover:text-sm">
                    Coin base
                  </figcaption>
                </a>
              </li>
            </ul>
          </section>
        </section>
      </Modal>

      <div className="flex flex-col gap-6">
        <button
          onClick={() => {
            setAction("/register");
            setIsOpen(true);
          }}
          className="font-[600] items-center flex gap-1 px-14 py-2 rounded-md bg-[#FFFFFF]/80 border-[1px] border-[#6F0694]"
        >
          {/* <Link to={'register'}>Create New Campaign</Link> */}
          Create New Campaign
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            className="mt-1"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <g clipPath="url(#clip0_227_327)">
              <rect
                width="20"
                height="20"
                transform="translate(0.5)"
                fill="#6F0694"
              />
              <path
                d="M10.5002 3.33301L9.32516 4.50801L13.9752 9.16634H3.8335V10.833H13.9752L9.32516 15.4913L10.5002 16.6663L17.1668 9.99967L10.5002 3.33301Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_227_327">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
              npm
            </defs>
          </svg>
        </button>
        <button
          onClick={() => {
            setAction("/campaign-list");
            setIsOpen(true);
          }}
          className="font-[600] flex gap-1 px-14 py-2 rounded-md bg-[#FFFFFF]/80 border-[1px] border-[#6F0694]"
        >
          {/* <Link to={'/campaign-list'}>Donate to Campaigns</Link> */}
          Donate to Campaigns
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            className="mt-1"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <g clipPath="url(#clip0_227_327)">
              <rect
                width="20"
                height="20"
                transform="translate(0.5)"
                fill="#6F0694"
              />
              <path
                d="M10.5002 3.33301L9.32516 4.50801L13.9752 9.16634H3.8335V10.833H13.9752L9.32516 15.4913L10.5002 16.6663L17.1668 9.99967L10.5002 3.33301Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_227_327">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </section>
  );
}
