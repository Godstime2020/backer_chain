import React, { ChangeEvent, useState } from 'react';
import 'daisyui/dist/full.css'; // Import DaisyUI styles

import idl from "../idl.json";
import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import {Program, AnchorProvider, web3, utils, BN} from "@project-serum/anchor";

import { useNavigate } from 'react-router-dom';


interface FormData {
  projectName: string;
  projectDesc: string;
  category: string;
  creatorName: string;
  raiseAmount: string;
}

const programID = new PublicKey(idl.metadata.address);
const network: string = clusterApiUrl("devnet");

const opts = {
  preflightCommitment : 'processed'  
}
const {SystemProgram} = web3;


const Input = ({ name, htmlFor, label, value, className, placeholder, onChange }: any) => {
  return (
    <div className='flex flex-col gap-2 mb-6'>
      <label htmlFor={htmlFor} className='label'>
        {label}
      </label>
      <input
        type='text'
        name={name}
        value={value}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default function Registration() {

  const navigate = useNavigate()


  function getProvider(){
    const connection = new Connection(network, opts.preflightCommitment);
    const {solana}: any = window;
    const provider = new AnchorProvider(connection, solana, opts.preflightCommitment);
    return provider
  }

  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectDesc: '',
    category: '',
    creatorName: '',
    raiseAmount: '',
  });

  const [error,setError] = useState<boolean>(false)
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if(!formData.projectName || !formData.projectDesc || !formData.creatorName || !formData.raiseAmount ){
       setError(true)
    }else{
      setError(false)
  }
  };


  const handleCreateCampaign = async () => {
      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        

        const [campaign] = PublicKey.findProgramAddressSync(
          [utils.bytes.utf8.encode("CAMPAIGN_DEMO"), provider.wallet.publicKey.toBuffer()],
          programID);

          await program.methods
                .create(formData.projectName, formData.projectDesc)
                .accounts({campaign, user: provider.wallet.publicKey, systemProgram: SystemProgram.programID})
                .rpc();

                navigate("/");

      } catch (error) {
          console.error("error creating campain: ", error)
      }
  }
  return (
    <div className='w-full h-max py-[2rem] flex flex-col items-center justify-center'>

     <div className="flex flex-col text-center mb-6">
       <h1 className='font-[600] text-4xl text-[#D8D7E5]'>Getting Started!</h1>
       <p className='font-[600] text-[13px] text-[#D9D9E3] tracking-wide mt-2'>Let Us Know What You Are CrowdFunding For</p>
     </div>

      <div className='p-8 bg-[#E8E8F1]/90 border-[1px] border-[#393939]/50'>
        <form action=''>
          <Input
            name='projectName'
            htmlFor='projectName'
            label='Project Name'
            className='input'
            value={formData.projectName}
            onChange={handleInputChange}
          />

          <div className='flex flex-col mb-7'>
            <label htmlFor='projectDesc' className='mb-1 label'>
              Project Description
            </label>
            <textarea
              rows={3}
              className='input h-40 '
              name='projectDesc'
              value={formData.projectDesc}
              onChange={handleInputChange}
            />
          </div>

          {/* Use the DaisyUI dropdown component */}
      <label htmlFor="category" className='label'>Category</label>
      <details className='dropdown mb-4 w-[320px] font-[600]'>
      <summary className='btn summary relative pr-10'>{formData.category || 'Select Category'}</summary>
      <ul className=' shadow menu dropdown-content  z-[1] bg-base-100 rounded-box w-52'>
        <li>
          <a onClick={() => handleInputChange({ target: { name: 'category', value: 'start-up' } } as ChangeEvent<HTMLSelectElement>)}>
            Start-Up
          </a>
        </li>
        <li>
          <a onClick={() => handleInputChange({ target: { name: 'category', value: 'tech' } } as ChangeEvent<HTMLSelectElement>)}>
            Tech
          </a>
        </li>
        <li>
          <a onClick={() => handleInputChange({ target: { name: 'category', value: 'ecommerce' } } as ChangeEvent<HTMLSelectElement>)}>
            E-commerce
          </a>
        </li>
        <li>
          <a onClick={() => handleInputChange({ target: { name: 'category', value: 'healthcare' } } as ChangeEvent<HTMLSelectElement>)}>
            Healthcare
          </a>
        </li>
        {/* Add more options as needed */}
      </ul>
    </details>

          <Input
            name='creatorName'
            htmlFor='creatorName'
            className='input'
            label='Creator Name'
            value={formData.creatorName}
            onChange={handleInputChange}
          />

          <Input
            name='raiseAmount'
            htmlFor='raiseAmount'
            className='input'
            label='How Much Do You Want To Raise'
            placeholder='SOL'
            value={formData.raiseAmount}
            onChange={handleInputChange}
          />
          {error && <p className='text-[red] ml-[100px] font-[600]'>*Required field missing</p> }
          <div className='w-full flex flex-col items-center justify-center mt-4'>
            <button
              type='button'
              onClick={handleCreateCampaign}
              className='bg-[#6F0694] px-[120px] py-2 rounded-md text-[#E8E8F1]/90 font-[600]'
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
