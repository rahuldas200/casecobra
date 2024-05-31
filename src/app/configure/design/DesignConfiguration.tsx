"use client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Rnd } from "react-rnd";
import HandleComponent from "@/components/HandleComponent";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {Label, RadioGroup} from '@headlessui/react'
import { useState } from "react";
import { COLORS } from "@/validator/option-validator";
import { relative } from "path";

interface DesignConfigurationProps {
  configId: string;
  imageUrl: string;
  imageDimension: { width: number; height: number };
}
const DesignConfiguration = ({
  configId,
  imageUrl,
  imageDimension,
}: DesignConfigurationProps) => {


    const [options,setOptions] =useState<{
      color:(typeof COLORS)[number]
    }>({
        color:COLORS[1],
    })

  return (
    <div className="relative mt-20 grid grid-col-3 mb-20 pb-20">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className=" relative w-60 bg-opacity-60 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={869 / 1831}
            className=" pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              fill
              alt="/phone image"
              src="/phone-template.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className="absolute z-20 inset-0 left-[-3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(299,231,235,0.5)]" />

          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[3px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimension.height / 4,
            width: imageDimension.width / 4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
          className="absolute z-20 border-[3px] border-primary"
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>
      <div className="h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="realtive flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tighter font-bold text-3xl">
              Cusomize your case
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6 "/>
            <div className="relative mt-4 h-full flex flex-col justify-center">

                <RadioGroup value={options.color}
                onChange={(val) =>{
                  setOptions( (prev) => ({
                    ...prev,
                    color:val,
                  }))
                }}
                >
                  <Label>
                    Color: {options.color.lable}
                  </Label>
                  <div className="mt-3 flex items-center space-x-3">
                      {
                        COLORS.map( (color) =>(
                          <RadioGroup.Option key={color.lable} value={color}
                          className={ ({active,checked}) => cn("relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",{
                            [`border-${color.tw}`]:active || checked
                          })} 
                          
                          >
                            <span className={cn(`bg-${color.tw}`,"h-8 w-8 rounded-full border border-black border-opacity-10")}></span>
                          </RadioGroup.Option>
                        ))
                      }
                  </div>
                </RadioGroup>
                
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default DesignConfiguration;
