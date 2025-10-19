import React from 'react'
import Link from 'next/link'
import Layouts from '@/Layouts/Layouts'
import { boxes } from '@/data/boxes'

export default function Page() {
  return (
    <Layouts>
      <main className="w-full h-full p-5 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {boxes.map((box) => (
            <Link href={box.route} key={box.id} className="group">
              <div className="relative bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl p-8 md:p-12 lg:p-14 flex items-center justify-center text-lg md:text-xl font-bold text-gray-700 rounded-2xl border border-gray-200/70 hover:border-gray-300/80 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden aspect-[9/11] min-w-[150px] md:min-w-[220px]">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-3 right-3 w-2 h-2 bg-gray-300 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>

                <div className="absolute bottom-2 left-2 w-8 h-1 bg-gradient-to-r from-gray-200 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>

                <div className="relative z-10 text-center space-y-2">
                  <div className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300 font-semibold">
                    {box.label}
                  </div>

                  <div className="w-6 h-0.5 bg-gray-300 rounded mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="h-8"></div>
      </main>
    </Layouts>
  )
}
