import React from 'react'
import Layouts from '@/Layouts/Layouts'
import Typography from '@/components/Typography'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { boxes } from '@/data/boxes'

export default function page() {
  return (
    <Layouts>
      <main className="w-full h-full p-5 flex flex-col gap-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="space-y-4">
          <Typography
            variant="h4"
            font="ClashDisplay"
            weight="semibold"
            className="text-gray-800"
          >
            Obatmu
          </Typography>
          <div className="w-full h-[20vh] md:h-[35vh] bg-gradient-to-br from-white to-gray-100 backdrop-blur-3xl rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-y-12 translate-y-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto opacity-40"></div>
                <div className="w-32 h-3 bg-gray-200 rounded mx-auto opacity-30"></div>
                <div className="w-24 h-2 bg-gray-200 rounded mx-auto opacity-20"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Typography
            variant="h4"
            font="ClashDisplay"
            weight="semibold"
            className="text-gray-800"
          >
            Aktifitasmu
          </Typography>
          <div className="w-full h-[20vh] md:h-[35vh] bg-gradient-to-br from-gray-50 to-white backdrop-blur-3xl rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-gray-50/50 to-transparent transform skew-y-12 -translate-y-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto opacity-40"></div>
                <div className="w-32 h-3 bg-gray-300 rounded mx-auto opacity-30"></div>
                <div className="w-24 h-2 bg-gray-300 rounded mx-auto opacity-20"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Typography
            variant="h4"
            font="ClashDisplay"
            weight="semibold"
            className="text-gray-800"
          >
            Kesehatan Saya
          </Typography>
          <Carousel
            opts={{
              align: 'center',
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {boxes.map((box) => (
                <CarouselItem
                  key={box.id}
                  className="md:basis-1/2 lg:basis-1/4 basis-1/2 pl-2 md:pl-4"
                >
                  <div className="p-1">
                    <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200/70 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                      <CardContent className="flex aspect-square items-center justify-center p-6 relative overflow-hidden">
                        <Link
                          href={box.route}
                          className="absolute inset-0 z-20"
                        />

                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 text-center space-y-2">
                          <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                            {box.label}
                          </span>
                          <div className="w-8 h-1 bg-gray-300 rounded mx-auto group-hover:bg-gray-400 transition-colors duration-300" />
                        </div>
                        <div className="absolute top-2 right-2 w-3 h-3 bg-gray-200 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="h-8"></div>
      </main>
    </Layouts>
  )
}
