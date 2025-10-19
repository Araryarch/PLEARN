'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Aktivitas Fisik: Pilar Kesehatan Tubuh dan Pikiran',
    subtitle:
      'Menjaga tubuh tetap aktif adalah kunci untuk meningkatkan kesehatan, mencegah penyakit, dan memperkuat kesejahteraan mental.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Aktivitas Fisik',
      icon: '📖',
      description:
        'Aktivitas fisik adalah setiap gerakan tubuh yang dilakukan oleh otot rangka dan menghasilkan pengeluaran energi. Aktivitas ini mencakup olahraga terstruktur maupun kegiatan sehari-hari seperti berjalan kaki, naik tangga, dan berkebun.',
      types: {
        title: 'Jenis-jenis Aktivitas Fisik',
        items: [
          {
            title: 'Aktivitas Aerobik',
            color: 'sky',
            description:
              'Aktivitas yang meningkatkan detak jantung dan pernapasan seperti berjalan cepat, berlari, berenang, atau bersepeda.',
          },
          {
            title: 'Latihan Kekuatan',
            color: 'red',
            description:
              'Melatih otot dan kekuatan tubuh seperti angkat beban, push-up, dan latihan ketahanan lainnya.',
          },
          {
            title: 'Latihan Fleksibilitas dan Keseimbangan',
            color: 'yellow',
            description:
              'Meningkatkan mobilitas tubuh seperti yoga, stretching, dan tai chi, terutama bermanfaat bagi lansia.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Aktivitas Fisik yang Sehat',
        description:
          'Aktivitas fisik yang efektif dilakukan secara konsisten, bertahap sesuai kemampuan, dan memperhatikan teknik yang aman. Disarankan minimal 150 menit per minggu untuk dewasa dengan intensitas sedang.',
      },
      benefits: {
        title: 'Manfaat Aktivitas Fisik',
        items: [
          'Meningkatkan kebugaran jantung dan paru',
          'Menurunkan risiko penyakit tidak menular seperti diabetes dan hipertensi',
          'Memperkuat otot dan tulang',
          'Mengurangi stres dan meningkatkan suasana hati',
          'Membantu mengontrol berat badan',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Berapa lama waktu ideal untuk berolahraga setiap minggu?',
          answer:
            'Organisasi kesehatan seperti WHO merekomendasikan minimal 150 menit aktivitas fisik intensitas sedang atau 75 menit intensitas tinggi setiap minggu untuk orang dewasa.',
        },
        {
          question: 'Apa contoh aktivitas fisik untuk orang sibuk?',
          answer:
            'Naik tangga, berjalan kaki saat istirahat, bersepeda ke tempat kerja, atau melakukan stretching ringan di sela aktivitas adalah contoh sederhana namun bermanfaat.',
        },
        {
          question: 'Apakah aktivitas fisik harus berupa olahraga berat?',
          answer:
            'Tidak harus. Aktivitas seperti membersihkan rumah, berkebun, atau jalan santai juga termasuk aktivitas fisik dan bermanfaat bagi kesehatan jika dilakukan rutin.',
        },
        {
          question: 'Bagaimana cara tetap konsisten berolahraga?',
          answer:
            'Tentukan jadwal tetap, pilih aktivitas yang disukai, mulai dari durasi pendek, ajak teman sebagai partner, dan tetapkan tujuan realistis untuk menjaga motivasi.',
        },
        {
          question: 'Apa risikonya jika kurang beraktivitas fisik?',
          answer:
            'Kurangnya aktivitas fisik meningkatkan risiko obesitas, penyakit jantung, gangguan metabolik, osteoporosis, serta gangguan kesehatan mental seperti stres dan depresi.',
        },
      ],
    },
    references: {
      title: 'Referensi dan Sumber',
      icon: '📚',
      organizations: {
        title: 'Organisasi Kesehatan Resmi',
        items: [
          {
            icon: '🏥',
            title: 'Kementerian Kesehatan RI',
            description:
              'Program Gerakan Masyarakat Hidup Sehat (GERMAS) untuk mendorong aktivitas fisik rutin.',
          },
          {
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Panduan global tentang aktivitas fisik dan pengaruhnya terhadap kesehatan masyarakat.',
          },
          {
            icon: '🏃',
            title: 'American College of Sports Medicine (ACSM)',
            description:
              'Rekomendasi ilmiah dan teknis seputar kebugaran dan latihan fisik.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Jurnal Kesehatan Masyarakat Indonesia',
            description:
              '"Hubungan Aktivitas Fisik dan Kesehatan Mental" - Studi lokal tentang manfaat aktivitas terhadap kualitas hidup.',
          },
          {
            title: 'The Lancet Physical Activity Series',
            description:
              '"Global Health Burden from Physical Inactivity" - Analisis dampak gaya hidup sedentari terhadap kesehatan dunia.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Pelacak Aktivitas',
          items: [
            'Google Fit - Pantau aktivitas harian dan target kebugaran',
            'Strava - Lacak olahraga seperti bersepeda dan lari',
            'Seven - Latihan 7 menit untuk kesibukan harian',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Panduan Aktivitas Fisik untuk Semua Usia"',
            '"Fitness Revolution: Membangun Gaya Hidup Aktif"',
            '"Olahraga dan Kesehatan Masyarakat"',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Konten ini bersifat informatif dan tidak menggantikan nasihat medis profesional. Konsultasikan terlebih dahulu dengan dokter jika memiliki kondisi kesehatan khusus sebelum memulai program latihan.',
      },
    },
  },
}

interface PageContent {
  header: {
    title: string
    subtitle: string
  }
  navigation: Array<{ id: SectionId; label: string }>
  sections: {
    definition: {
      title: string
      icon: string
      description: string
      types: {
        title: string
        items: Array<{
          title: string
          color: string
          description: string
        }>
      }
      principles: {
        title: string
        description: string
      }
      benefits: {
        title: string
        items: string[]
      }
    }
    questions: {
      title: string
      icon: string
      items: Array<{
        question: string
        answer: string
      }>
    }
    references: {
      title: string
      icon: string
      organizations: {
        title: string
        items: Array<{
          icon: string
          title: string
          description: string
        }>
      }
      publications: {
        title: string
        items: Array<{
          title: string
          description: string
        }>
      }
      guides: {
        title: string
        apps: {
          title: string
          items: string[]
        }
        books: {
          title: string
          items: string[]
        }
      }
      disclaimer: {
        title: string
        description: string
      }
    }
  }
}

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId>('definition')

  const scrollToSection = (sectionId: SectionId): void => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Layouts>
      <main className="w-full min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="w-full px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {content.header.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content.header.subtitle}
            </p>
          </div>
        </div>

        {/* Bookmark Navigation */}
        <div className="sticky top-0 bg-white border-b shadow-sm z-10">
          <div className="w-full px-6">
            <nav className="flex space-x-8">
              {content.navigation.map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeSection === nav.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {nav.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="w-full px-6 py-8 space-y-12">
          {/* Definition Section */}
          <section id="definition" className="scroll-mt-20">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-blue-500 mr-3">
                  {content.sections.definition.icon}
                </span>
                {content.sections.definition.title}
              </h2>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {content.sections.definition.description}
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3">
                    {content.sections.definition.types.title}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {content.sections.definition.types.items.map(
                      (type, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg">
                          <h4
                            className={`font-semibold text-${type.color}-700 mb-2`}
                          >
                            {type.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {type.description}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {content.sections.definition.principles.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {content.sections.definition.principles.description}
                </p>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">
                    {content.sections.definition.benefits.title}:
                  </h4>
                  <ul className="text-gray-700 space-y-2">
                    {content.sections.definition.benefits.items.map(
                      (benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Questions Section */}
          <section id="questions" className="scroll-mt-20">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-green-500 mr-3">
                  {content.sections.questions.icon}
                </span>
                {content.sections.questions.title}
              </h2>

              <div className="space-y-6">
                {content.sections.questions.items.map((item, index) => (
                  <div
                    key={index}
                    className={`pb-6 ${index < content.sections.questions.items.length - 1 ? 'border-b' : ''}`}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* References Section */}
          <section id="references" className="scroll-mt-20">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-purple-500 mr-3">
                  {content.sections.references.icon}
                </span>
                {content.sections.references.title}
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {content.sections.references.organizations.title}
                  </h3>
                  <div className="space-y-3">
                    {content.sections.references.organizations.items.map(
                      (org, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="text-blue-500 mt-1">{org.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {org.title}
                            </h4>
                            <p className="text-gray-600 text-sm">
                              {org.description}
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    {content.sections.references.publications.title}
                  </h3>
                  <div className="space-y-3 text-sm">
                    {content.sections.references.publications.items.map(
                      (pub, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded border-l-4 border-blue-400"
                        >
                          <h4 className="font-semibold text-gray-800">
                            {pub.title}
                          </h4>
                          <p className="text-gray-600">{pub.description}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">
                    {content.sections.references.guides.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">
                        {content.sections.references.guides.apps.title}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {content.sections.references.guides.apps.items.map(
                          (app, index) => (
                            <li key={index}>• {app}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">
                        {content.sections.references.guides.books.title}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {content.sections.references.guides.books.items.map(
                          (book, index) => (
                            <li key={index}>• {book}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <span className="text-yellow-600 text-xl">⚠️</span>
                    <div>
                      <h4 className="font-semibold text-yellow-800">
                        {content.sections.references.disclaimer.title}
                      </h4>
                      <p className="text-yellow-700 text-sm mt-1">
                        {content.sections.references.disclaimer.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layouts>
  )
}
