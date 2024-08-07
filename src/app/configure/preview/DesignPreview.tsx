"use client";
import { Configuration } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import Phone from "@/components/Phone";
import { COLORS, FINISHES, MODELS } from "@/validator/option-validator";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { BASE_PRICE, PRODUCT_PRICE } from "@/config/products";
import { formatePrice } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@headlessui/react";
import { SaveConfigArgs } from "../design/actions";
import { createCheckoutSession } from "./action";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {useKindeBrowserClient} from '@kinde-oss/kinde-auth-nextjs'
import LoginModal from "@/components/LoginModal";

export default function DesignPreview({
  configuration,
}: {
  configuration: Configuration;
}) {
  console.log(configuration.croppedImageUrl);

  const router = useRouter();
  const { toast } = useToast();
  const {id} = configuration
  const {user} = useKindeBrowserClient()

  const [showconfetti, setShowConfetti] = useState(false);
  const [isLoginModelOpen, setisLoginModelOpen] = useState<boolean>(false)

  useEffect(() => {
    setShowConfetti(true);
  });

  const { color, model, finish, material } = configuration;
  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate") {
    totalPrice += PRODUCT_PRICE.material.polycarbonate;
  }
  if (finish === "textured") {
    totalPrice += PRODUCT_PRICE.finish.textured;
  }

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ['get-checkout-session'],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url);
      } else {
        throw new Error("Unable to retrive payment URL");
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCheckout = () => {
    if(user){
      createPaymentSession({configId:id})
    } 
    else {
      // need to login
      localStorage.setItem('configurationId',id);
      setisLoginModelOpen(true)
    }
  }

  return (
    <div className="flex  flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showconfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div> 

      <div className="w-full flex justify-center items-center mt-20">
        <Phone
          className={cn(`bg-${tw} w-[35%] sm:w-[30%] md:w-[25%] lg:w-[20%]`)}
          imgSrc={configuration.croppedImageUrl!}
        />
      </div>



      <div className="mt-20">
        <div className="mt-6 sm:col-span-9 sm:mt-2 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex item-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className=" ggrid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-bold text-zinc-950 ">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warrenty</li>
              </ol>
            </div>
            <div className="mt-3">
              <p className="font-bold text-zinc-700 "> Material</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality, durable material</li>
                <li>Scratch and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 ">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex item-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Texture</p>
                  <p className="font-mediam text-gray-900">
                    {formatePrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === "textured" ? (
                  <div className="flex item-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Texture</p>
                    <p className="font-mediam text-gray-900">
                      {formatePrice(PRODUCT_PRICE.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}

                {material === "polycarbonate" ? (
                  <div className="flex item-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Soft polycarbonate</p>
                    <p className="font-mediam text-gray-900">
                      {formatePrice(PRODUCT_PRICE.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-gray-200" />

                <div className="flex items-center justify-center py-2">
                  <p className="font-semibold text-gray-900">Order total</p>
                  <p className="font-semibold text-gray-900">
                    {" "}
                    {formatePrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <LoginModal isOpen={isLoginModelOpen} setIsOpen={setisLoginModelOpen} />

            <div className="mt-8 flex justify-end pb-12 text-white">
              <Button onClick={()=> handleCheckout()} className="px-4 py-2.5 rounded-md sm:px-6 lg:px-8 bg-green-600">
                Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
