import React, { useState } from 'react';
import { List,  } from 'antd';
import CampaignListData from '@/mockData/campaignList'
import { useNavigate } from 'react-router-dom';
import { web3 } from '@project-serum/anchor';


const CampaignCard: React.FC = ({campaigns}) => {

    const navigate = useNavigate()

  return (
    <>
      <List
        pagination={{ position: "bottom", align:"center" }}
        dataSource={campaigns}
        renderItem={(item) => (
          <List.Item>

            <div  onClick={() => navigate("/campaign_detail", {state:{campaign: {
              name: item.name,
              pubKey: item.pubKey.toString(),
              amountDonated: (item.amountDonated / web3.LAMPORTS_PER_SOL).toString(),
              admin: item.admin.toString(),
              description: item.description


            }}})} className="w-full flex sm:flex-row flex-col gap-4 cursor-pointer rounded-md py-1 px-2 mb-4 ">
                         <img src={item.image} className='w-[168px]' />
                         <div className="fle flex-col gap-4 rounded-md  bg-[#D2D1E5] py-2 px-4 w-full">
                            <h1 className='text-[#393939] text-[18px] font-[600] tracking-wide'>{item.name}</h1>
                            <span className='bg-[#4c4b6b] text-slate-100 font-[600] rounded-lg text-[11px] p-1'>{item.pubKey.toString()}</span>
                            <p className='text-[#555353] font-[400] tracking-wide'>{item.description}</p>
                            <p className='text-[#393939] text-[20px] font-[600] tracking-[0.16px]'>{(item.amountDonated / web3.LAMPORTS_PER_SOL).toString()}
                            <span className='text-[#6E6E6E] text-[16px] ml-2'> sol raised</span></p>
                            
                            {/* <div className="bg-[#C5C0C0] rounded-lg h-[10px] w-[376px]">
                                <div className={`h-[10px] rounded-lg bg-[#AC24DC] w-[${item.raised * 1}px]`}></div>
                            </div> */}
                         </div>
                    </div>

          </List.Item>
        )}
      />
    </>
  );
};

export default CampaignCard;