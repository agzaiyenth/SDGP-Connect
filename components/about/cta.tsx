/* Copyright (c) 2025, the contributors of the SDGP Connect project. All Rights Reserved.

This software is the joint property of the contributors to the SDGP Connect project.
Unauthorized distribution, commercial use, or reproduction of any part of this material
in any form is strictly prohibited without the explicit written consent of all contributors.
You may not alter or remove any copyright or attribution notice from this content. */

'use client'
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function CTASection() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["real.", "impactful.", "collaborative.", "sustainable.", "transformative."],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full -mt-12 mb-32 px-10">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Reach out<MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">This is something</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Building meaningful solutions begins here.
              Through teamwork, innovation, and a shared commitment to solving real-world challenges, we transform ideas into impactful software that uplifts communities and drives sustainable change.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            {/* Call Button */}
            <a href="tel:+94777781061">
              <Button size="lg" className="gap-4" variant="outline">
                Jump on a call <PhoneCall className="w-4 h-4" />
              </Button>
            </a>

            {/* Contact Page Button */}
            <a href="/contact">
              <Button size="lg" className="gap-4">
                Contact Us <MoveRight className="w-4 h-4" />
              </Button>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export { CTASection };

