'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Pertolongan Pertama: Langkah Awal Menyelamatkan Nyawa',
    subtitle:
      'Pentingnya pengetahuan dasar tentang pertolongan pertama untuk merespons keadaan darurat secara cepat dan tepat.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Pertolongan Pertama',
      icon: '📖',
      description:
        'Pertolongan pertama adalah tindakan awal yang diberikan kepada seseorang yang mengalami cedera atau kondisi darurat kesehatan sebelum mendapatkan perawatan medis lanjutan. Tujuannya untuk menyelamatkan nyawa, mencegah kondisi memburuk, dan mempercepat pemulihan.',
      types: {
        title: 'Jenis Situasi Pertolongan Pertama',
        items: [
          {
            title: 'Luka dan Pendarahan',
            color: 'red',
            description:
              'Menghentikan pendarahan, membersihkan luka, dan menutup luka dengan perban steril.',
          },
          {
            title: 'Luka Bakar',
            color: 'orange',
            description:
              'Mendinginkan area luka bakar dengan air mengalir dan menutup dengan kain bersih.',
          },
          {
            title: 'Tersedak',
            color: 'yellow',
            description:
              'Melakukan teknik Heimlich maneuver untuk mengeluarkan benda asing dari saluran napas.',
          },
          {
            title: 'Pingsan atau Hilang Kesadaran',
            color: 'blue',
            description:
              'Memastikan jalan napas terbuka, posisi tubuh aman, dan memantau respons korban.',
          },
          {
            title: 'CPR (Resusitasi Jantung Paru)',
            color: 'green',
            description:
              'Dilakukan saat korban tidak bernapas dan tidak merespons, untuk menjaga sirkulasi darah dan oksigen.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Pertolongan Pertama',
        description:
          'Prinsip utama dalam pertolongan pertama dikenal sebagai DRCAB: Danger (bahaya), Response (respons korban), Circulation (sirkulasi), Airway (jalan napas), dan Breathing (pernapasan). Selalu tenang, evaluasi situasi, dan hubungi bantuan medis secepatnya.',
      },
      benefits: {
        title: 'Manfaat Pengetahuan Pertolongan Pertama',
        items: [
          'Menyelamatkan nyawa sebelum bantuan medis datang',
          'Mengurangi tingkat keparahan cedera',
          'Meningkatkan rasa aman di lingkungan sekitar',
          'Meningkatkan kesiapsiagaan individu dalam situasi darurat',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Apa yang harus dilakukan saat melihat seseorang pingsan?',
          answer:
            'Periksa respons korban, pastikan jalan napas terbuka, dan posisikan korban dalam posisi pemulihan jika bernapas. Jika tidak bernapas, segera lakukan CPR dan hubungi layanan darurat.',
        },
        {
          question: 'Bagaimana cara menangani luka yang berdarah deras?',
          answer:
            'Tekan langsung luka dengan kain bersih atau perban, angkat bagian tubuh yang terluka jika memungkinkan, dan tetap tekan hingga pendarahan berhenti atau bantuan tiba.',
        },
        {
          question: 'Apakah semua orang bisa melakukan CPR?',
          answer:
            'Ya, dengan pelatihan dasar, siapa pun bisa melakukan CPR. Tekniknya melibatkan kompresi dada secara berirama. Pelatihan formal sangat dianjurkan untuk efektivitas maksimal.',
        },
        {
          question:
            'Apa yang harus dilakukan jika seseorang mengalami tersedak?',
          answer:
            'Minta korban untuk batuk kuat. Jika tidak efektif dan korban tidak bisa bernapas, lakukan Heimlich maneuver: dorongan perut dari belakang sampai benda keluar.',
        },
        {
          question:
            'Kapan harus mencari bantuan medis setelah pertolongan pertama?',
          answer:
            'Segera cari bantuan medis untuk luka parah, luka bakar derajat tinggi, patah tulang, sesak napas, kehilangan kesadaran, atau jika kondisi tidak membaik setelah pertolongan pertama.',
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
            title: 'Palang Merah Indonesia (PMI)',
            description:
              'Pelatihan dan edukasi pertolongan pertama di tingkat nasional.',
          },
          {
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Panduan global tentang penanganan darurat dan kesiapsiagaan bencana.',
          },
          {
            icon: '🚑',
            title:
              'International Federation of Red Cross and Red Crescent Societies (IFRC)',
            description: 'Standar internasional pelatihan pertolongan pertama.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah dan Manual',
        items: [
          {
            title: 'First Aid Manual (St John Ambulance)',
            description:
              'Panduan praktis dan ilustratif pertolongan pertama dari organisasi terkemuka di Inggris.',
          },
          {
            title:
              'Basic Life Support (BLS) Guidelines – American Heart Association',
            description:
              'Protokol terbaru CPR dan penanganan kegawatdaruratan jantung dan napas.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Kesehatan',
          items: [
            'PMI First Aid - Panduan pertolongan pertama versi Indonesia',
            'Red Cross First Aid - Aplikasi global pelatihan dan simulasi P3K',
            '112 Emergency - Akses layanan darurat nasional Indonesia',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Pertolongan Pertama di Rumah dan Tempat Kerja"',
            '"CPR and AED Essentials"',
            '"Panduan P3K untuk Keluarga dan Sekolah"',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi ini bertujuan edukatif. Pelatihan formal pertolongan pertama sangat dianjurkan. Dalam kondisi darurat, selalu hubungi layanan medis profesional.',
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
