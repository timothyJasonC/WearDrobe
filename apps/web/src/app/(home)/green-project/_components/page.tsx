import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PiArrowUpRight } from 'react-icons/pi';

const EnvironmentalReport = () => {
  return (
    <div className="bg-[#F8F8FF] flex justify-center items-center min-h-screen p-4">
      <div className="max-w-4xl text-left text-black/60">
        <h2 className="text-2xl font-bold mb-4 text-black">WareDrobe&apos;s Commitment to a Healthier Environment</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-2 text-black">Introduction</h3>
        <div className='h-72 overflow-hidden flex items-center mb-2'>
            <Image priority
                src="https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg"
                alt="A bag full of bottles" width={1200} height={800}
            />
        </div>
        <p>
          WareDrobe, a leading multi-warehouse clothing company specializing in urban wear, is deeply committed to environmental sustainability. Our mission goes beyond providing trendy and comfortable clothing; we strive to make a significant positive impact on the environment. This article outlines our key initiatives and real data demonstrating our contributions to a healthier planet.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2 text-black">Sustainable Materials</h3>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Organic Cotton</h4>
        <p className="pl-4">
          Organic cotton farming reduces water usage by 91% compared to conventional cotton farming. In 2023, WareDrobe used 500,000 kg of organic cotton, saving approximately 4.5 billion liters of water.
        </p>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Recycled Polyester</h4>
        <p className="pl-4">
          By using recycled polyester, we have repurposed 2 million plastic bottles, preventing them from ending up in landfills and oceans.
        </p>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Tencel</h4>
        <p className="pl-4">
          This biodegradable material requires less energy and water to produce. In the past year, 30% of our new clothing line incorporated Tencel, reducing our carbon footprint by 50 tons of CO2.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2 text-black">Eco-friendly Production Processes</h3>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Water Recycling</h4>
        <p className="pl-4">
          Our dyeing and finishing processes now include water recycling systems, allowing us to reuse 80% of the water, saving 1.2 million liters annually.
        </p>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Energy Efficiency</h4>
        <p className="pl-4">
          We have upgraded our manufacturing facilities with energy-efficient machinery, reducing energy consumption by 25%. This has led to a decrease in greenhouse gas emissions by 1,000 tons of CO2 equivalent per year.
        </p>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Waste Reduction</h4>
        <p className="pl-4">
          Our zero-waste policy ensures that fabric scraps are repurposed or recycled. In 2023, we repurposed 250,000 kg of fabric waste into new products.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2 text-black">Ethical Labor Practices</h3>
        <div className='h-72 overflow-hidden flex items-center mb-2'>
            <Image
                priority
                src="https://images.unsplash.com/photo-1606501126768-b78d4569d3f9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Sewing machine"
                width={1200}
                height={800}
            />
        </div>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Fair Wages and Safe Working Conditions</h4>
        <p className="pl-4">
          WareDrobe ensures that all workers in our supply chain are paid fair wages and work in safe, healthy environments. This reduces turnover and increases the sustainability of our operations.
        </p>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Community Development</h4>
        <p className="pl-4">
          We invest in local communities by supporting education and healthcare initiatives. In 2023, we funded 10 schools and 5 health clinics in regions where our factories operate.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2 text-black">Green Logistics</h3>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Efficient Transportation</h4>
        <p className="pl-4">
          By optimizing our transportation routes and using fuel-efficient vehicles, we have reduced our transportation-related carbon emissions by 15%, saving 500 tons of CO2 per year.
        </p>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Sustainable Packaging</h4>
        <p className="pl-4">
          We use 100% recyclable and biodegradable packaging materials. In the past year, this has prevented 1.5 million plastic bags from being produced.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2 text-black">Consumer Education and Engagement</h3>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Transparency</h4>
        <p className="pl-4">
          WareDrobe provides detailed information about the environmental impact of each product. Our &quot;Eco-Score&quot; system rates items based on their sustainability, helping customers make informed decisions.
        </p>
        <h4 className="text-lg font-medium mt-4 mb-2 text-black pl-4">Recycling Programs</h4>
        <p className="pl-4">
          Our clothing recycling program encourages customers to return old clothes for recycling, with over 50,000 items collected and repurposed in 2023.
        </p>
        <div className='lg:max-h-[27rem] overflow-hidden flex items-center my-4 relative'>
            <Image
                priority
                src="https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg"
                alt="A man taking a dunk to a basket ball hoop"
                width={1200}
                height={800}
            />
            <div className='absolute top-0 sm:top-10 flex max-lg:w-full flex-col gap-4'>
                <div className='bg-[#F8F8FF] py-2 px-5'>
                    <span className='font-light text-black/70'>Score big with <span className='font-semibold text-black'>WearDrobe&apos;s urban wear!</span></span>
                </div>
            </div>
            <Link className='hover:underline underline-offset-1wh absolute bottom-10 right-0 bg-[#F8F8FF] py-2 px-5 flex items-center gap-2' href={'/catalogs'}>
                <span>Explore Now</span>
                <PiArrowUpRight />
            </Link>
        </div>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-black">Conclusion</h3>
        <p>
          WareDrobe&apos;s commitment to environmental sustainability is evident in our use of sustainable materials, eco-friendly production processes, ethical labor practices, green logistics, and consumer engagement. Our initiatives have made a tangible impact, saving water, reducing carbon emissions, and preventing waste. As we continue to grow, we remain dedicated to pushing the boundaries of sustainability in the fashion industry, ensuring a healthier environment for future generations.
        </p>
      </div>
    </div>
  );
};

export default EnvironmentalReport;
