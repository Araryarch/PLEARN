'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Penyalahgunaan Zat: Ancaman bagi Kesehatan dan Kehidupan',
    subtitle:
      'Memahami dampak negatif penyalahgunaan zat serta langkah pencegahan dan penanganannya.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Penyalahgunaan Zat',
      icon: '📖',
      description:
        'Penyalahgunaan zat adalah penggunaan obat-obatan atau bahan kimia tertentu secara berlebihan, tidak sesuai anjuran medis, atau untuk tujuan rekreasional yang berdampak negatif terhadap kesehatan fisik, mental, dan sosial.',
      types: {
        title: 'Jenis Zat yang Sering Disalahgunakan',
        items: [
          {
            title: 'Narkotika dan Psikotropika',
            color: 'red',
            description:
              'Termasuk heroin, kokain, sabu-sabu, ekstasi, dan LSD. Zat ini memengaruhi sistem saraf pusat dan dapat menimbulkan ketergantungan.',
          },
          {
            title: 'Zat Inhalan',
            color: 'yellow',
            description:
              'Zat yang dihirup seperti lem, bensin, atau cairan pelarut yang dapat menimbulkan efek euforia namun berbahaya bagi otak dan organ tubuh.',
          },
          {
            title: 'Alkohol',
            color: 'blue',
            description:
              'Minuman beralkohol jika dikonsumsi berlebihan dapat menyebabkan gangguan liver, jantung, dan gangguan mental.',
          },
          {
            title: 'Obat-obatan Resep yang Disalahgunakan',
            color: 'orange',
            description:
              'Seperti obat penenang, pereda nyeri (opioid), dan stimulan yang digunakan tanpa pengawasan dokter.',
          },
        ],
      },
      principles: {
        title: 'Faktor Risiko dan Pencegahan',
        description:
          'Faktor risiko penyalahgunaan zat meliputi tekanan teman sebaya, stres, depresi, riwayat keluarga, dan kurangnya edukasi. Pencegahan dapat dilakukan melalui edukasi, penguatan mental, lingkungan suportif, serta akses terhadap layanan kesehatan dan rehabilitasi.',
      },
      benefits: {
        title: 'Manfaat Menjauhi Penyalahgunaan Zat',
        items: [
          'Menjaga fungsi otak dan tubuh tetap optimal',
          'Mencegah ketergantungan dan gangguan mental',
          'Meningkatkan kualitas hidup dan produktivitas',
          'Menghindari masalah hukum dan sosial',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Apa saja tanda-tanda seseorang menyalahgunakan zat?',
          answer:
            'Tanda-tandanya antara lain perubahan perilaku, penurunan prestasi, menarik diri dari lingkungan sosial, perubahan fisik (berat badan turun drastis, mata merah), serta sering berbohong atau menyembunyikan sesuatu.',
        },
        {
          question: 'Apakah penyalahgunaan zat bisa disembuhkan?',
          answer:
            'Ya. Dengan bantuan profesional seperti psikolog, psikiater, dan program rehabilitasi, penyalahgunaan zat bisa diatasi dan pemulihan bisa dicapai.',
        },
        {
          question:
            'Bagaimana cara membantu teman yang terlibat penyalahgunaan zat?',
          answer:
            'Tunjukkan kepedulian dengan tidak menghakimi, ajak berbicara dengan tenang, dan arahkan untuk mencari bantuan profesional. Hindari konfrontasi yang agresif.',
        },
        {
          question:
            'Apakah semua orang yang mencoba zat adiktif pasti kecanduan?',
          answer:
            'Tidak semua, tetapi penggunaan pertama bisa membuka jalan menuju kecanduan, terutama jika digunakan berulang atau dalam dosis tinggi. Faktor genetik dan lingkungan turut memengaruhi.',
        },
        {
          question: 'Apa hubungan antara stres dan penyalahgunaan zat?',
          answer:
            'Banyak orang menggunakan zat untuk “melarikan diri” dari stres atau masalah emosional. Oleh karena itu, penting mengembangkan keterampilan manajemen stres sebagai langkah preventif.',
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
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Pedoman global dalam pencegahan dan penanganan penyalahgunaan zat.',
          },
          {
            icon: '🏥',
            title: 'Badan Narkotika Nasional (BNN)',
            description:
              'Informasi dan layanan rehabilitasi penyalahgunaan narkoba di Indonesia.',
          },
          {
            icon: '🧠',
            title: 'National Institute on Drug Abuse (NIDA)',
            description:
              'Riset dan edukasi tentang dampak dan solusi penyalahgunaan zat.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Addiction Journal',
            description:
              '"Substance Use and Mental Health Disorders" – Studi hubungan antara penyalahgunaan zat dan gangguan mental.',
          },
          {
            title: 'The Lancet Psychiatry',
            description:
              '"Global Trends in Substance Use" – Analisis tren global dan strategi penanganan penyalahgunaan zat.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Edukasi dan Dukungan',
          items: [
            'Rehab4Addiction – Panduan dan sumber bantuan mandiri',
            'Sober Grid – Komunitas pemulihan online',
            'QuitNow! – Aplikasi untuk berhenti merokok',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Clean" oleh David Sheff',
            '"Beautiful Boy" oleh David Sheff',
            '"The Addiction Recovery Workbook"',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi ini disediakan sebagai bahan edukasi dan bukan pengganti bantuan medis atau psikologis profesional. Jika Anda atau orang terdekat mengalami masalah penyalahgunaan zat, segera hubungi tenaga kesehatan yang kompeten.',
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
