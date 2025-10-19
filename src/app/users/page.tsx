import React from 'react'
import Layouts from '@/Layouts/Layouts'

export default function page() {
  return (
    <Layouts>
      <main className="w-full h-full p-5 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* avatar wrapper */}
        <div className="w-full h-[25vh] md:h-[35vh] bg-gradient-to-br from-white to-gray-50 backdrop-blur-3xl rounded-2xl p-5 md:p-8 flex gap-4 md:gap-6 shadow-lg border border-gray-200/70 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/30 to-transparent transform -skew-y-12 translate-y-full"></div>

          {/* Avatar container */}
          <div className="relative z-10 aspect-square w-[50%] md:w-[20%] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-md border border-gray-200/50 flex items-center justify-center group hover:shadow-lg transition-all duration-300">
            {/* Avatar placeholder */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

            {/* Avatar border accent */}
            <div className="absolute inset-2 border-2 border-gray-200/30 rounded-xl"></div>
          </div>

          {/* Content avatar */}
          <div className="relative z-10 flex-1 flex flex-col justify-center space-y-3 md:space-y-4">
            {/* Name placeholder */}
            <div className="space-y-2">
              <div className="w-40 md:w-48 h-6 md:h-8 bg-gray-300 rounded-lg opacity-50"></div>
              <div className="w-32 md:w-40 h-4 md:h-5 bg-gray-250 rounded opacity-30"></div>
            </div>

            {/* Status/info placeholders */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full opacity-40"></div>
                <div className="w-24 md:w-32 h-3 bg-gray-300 rounded opacity-40"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full opacity-40"></div>
                <div className="w-28 md:w-36 h-3 bg-gray-300 rounded opacity-40"></div>
              </div>
            </div>

            {/* Action buttons placeholder */}
            <div className="flex gap-2 md:gap-3 pt-2">
              <div className="w-20 md:w-24 h-8 md:h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg opacity-50 hover:opacity-70 transition-opacity duration-300"></div>
              <div className="w-16 md:w-20 h-8 md:h-10 bg-gradient-to-r from-gray-150 to-gray-250 rounded-lg opacity-40 hover:opacity-60 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Top right accent */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-gray-300 rounded-full opacity-20"></div>
        </div>

        {/* Additional content sections */}
        <div className="mt-6 space-y-6">
          {/* Health Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Hari Sehat', value: '15' },
              { label: 'Obat Diminum', value: '8/10' },
              { label: 'Checkup', value: '3' },
              { label: 'Target Tercapai', value: '85%' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 md:p-6 shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                    {stat.label}
                  </div>
                  <div className="w-8 h-0.5 bg-gray-300 rounded mx-auto opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Health Activity Section */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 md:p-8 shadow-lg border border-gray-200/70 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
                Aktivitas Kesehatan
              </h3>

              <div className="space-y-4">
                {[
                  {
                    activity: 'Minum obat diabetes',
                    time: '2 jam yang lalu',
                    status: 'completed',
                  },
                  {
                    activity: 'Checkup rutin dengan Dr. Sarah',
                    time: '1 hari yang lalu',
                    status: 'completed',
                  },
                  {
                    activity: 'Reminder: Minum obat hipertensi',
                    time: '30 menit lagi',
                    status: 'upcoming',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 md:p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors duration-300"
                  >
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                        item.status === 'completed'
                          ? 'bg-green-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full ${
                          item.status === 'completed'
                            ? 'bg-green-300'
                            : 'bg-blue-300'
                        } opacity-60`}
                      ></div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="text-gray-700 font-medium text-sm md:text-base">
                        {item.activity}
                      </div>
                      <div className="text-gray-500 text-xs md:text-sm">
                        {item.time}
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {item.status === 'completed' ? 'Selesai' : 'Mendatang'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-100/30 to-transparent rounded-full transform translate-x-16 translate-y-16"></div>
          </div>
        </div>

        {/* Breathing space */}
        <div className="h-8"></div>
      </main>
    </Layouts>
  )
}
