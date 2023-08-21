import { ChangeEvent, useEffect, useState } from "react";
import CampaignCard from "./campaignPagination";
import idl from "../idl.json";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from "@project-serum/anchor";

import { useNavigate } from "react-router-dom";

const programID = new PublicKey(idl.metadata.address);
const network: string = clusterApiUrl("devnet");

const opts = {
  preflightCommitment: "processed",
};
const { SystemProgram } = web3;

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState(null);

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

      Promise.all(
        (await connection.getProgramAccounts(programID)).map(
          async (campaign) => ({
            ...(await program.account.campaign.fetch(campaign.pubkey)),
            pubKey: campaign.pubkey,
            image:'/cp3.png'
          })
        )
      ).then((campaigns) => {
        setCampaigns(campaigns);
        console.log(campaigns);
      });
    } catch (error) {
      alert("please Check your internet Connection");
    }
  };

  useEffect(() => {
    getCampaign();
  }, []);


  return (
    <section className='flex items-center justify-center w-full h-contain py-[2rem] px-[2rem]'>
      {campaigns && 
      <div className=" w-100 h-contain relative m-auto bg-[#E9E8F1]/90 py-10 rounded-sm px-4 flex flex-col">
        <CampaignCard campaigns = {campaigns}/>
      </div>}
    </section>
  )
}
