'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Kesehatan Reproduksi: Dasar Kehidupan yang Sehat dan Bermartabat',
    subtitle:
      'Memahami pentingnya kesehatan reproduksi untuk menjaga hak, kesejahteraan, dan kualitas hidup setiap individu.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Kesehatan Reproduksi',
      icon: '📖',
      description:
        'Kesehatan reproduksi adalah kondisi kesehatan fisik, mental, dan sosial secara utuh yang berkaitan dengan sistem, fungsi, dan proses reproduksi. Ini mencakup kemampuan untuk memiliki kehidupan seksual yang aman dan memuaskan, serta kebebasan untuk memutuskan kapan dan apakah akan memiliki anak.',
      types: {
        title: 'Aspek Kesehatan Reproduksi',
        items: [
          {
            title: 'Kesehatan Seksual',
            color: 'pink',
            description:
              'Mendorong hubungan seksual yang sehat, aman, dan menyenangkan, serta bebas dari paksaan dan kekerasan.',
          },
          {
            title: 'Kesehatan Ibu dan Anak',
            color: 'red',
            description:
              'Perawatan sebelum, selama, dan setelah kehamilan, termasuk pelayanan persalinan yang aman dan perencanaan keluarga.',
          },
          {
            title: 'Pencegahan dan Penanganan IMS',
            color: 'purple',
            description:
              'Edukasi, pencegahan, dan pengobatan infeksi menular seksual seperti HIV, klamidia, dan HPV.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Dasar Kesehatan Reproduksi',
        description:
          'Hak setiap individu untuk memperoleh informasi dan pelayanan kesehatan reproduksi, tanpa diskriminasi, tekanan, atau kekerasan. Pendidikan seksual yang komprehensif dan akses terhadap kontrasepsi juga merupakan bagian penting.',
      },
      benefits: {
        title: 'Manfaat Menjaga Kesehatan Reproduksi',
        items: [
          'Menurunkan angka kehamilan yang tidak direncanakan',
          'Mencegah penularan penyakit menular seksual',
          'Meningkatkan kesadaran tentang hak dan tubuh sendiri',
          'Menjamin kehamilan dan persalinan yang aman',
          'Mendukung kesejahteraan mental dan emosional',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Apa itu kesehatan reproduksi secara menyeluruh?',
          answer:
            'Kesehatan reproduksi bukan hanya bebas dari penyakit, tapi juga mencakup kesejahteraan fisik, mental, dan sosial dalam semua aspek yang berkaitan dengan sistem reproduksi.',
        },
        {
          question: 'Mengapa pendidikan seksual penting bagi remaja?',
          answer:
            'Pendidikan seksual memberikan pemahaman yang benar tentang tubuh, hubungan, dan kesehatan, sehingga remaja dapat membuat keputusan yang bertanggung jawab dan terhindar dari risiko seperti kehamilan dini atau IMS.',
        },
        {
          question: 'Bagaimana cara mencegah penyakit menular seksual (PMS)?',
          answer:
            'Pencegahan dapat dilakukan dengan menggunakan kondom, melakukan pemeriksaan rutin, setia pada satu pasangan, dan mendapatkan vaksin seperti HPV. Komunikasi terbuka dengan pasangan juga penting.',
        },
        {
          question: 'Apa itu perencanaan keluarga dan mengapa penting?',
          answer:
            'Perencanaan keluarga adalah penggunaan metode kontrasepsi untuk mengatur jarak dan jumlah anak. Ini penting untuk kesehatan ibu, anak, serta stabilitas ekonomi dan sosial keluarga.',
        },
        {
          question:
            'Bagaimana mendukung pasangan dalam menjaga kesehatan reproduksi?',
          answer:
            'Dengan komunikasi yang terbuka, saling mendukung untuk cek kesehatan, menghormati batasan masing-masing, dan berbagi tanggung jawab dalam perencanaan keluarga serta pengasuhan anak.',
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
              'Informasi program kesehatan reproduksi nasional dan pelayanan KB.',
          },
          {
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Kebijakan dan panduan global mengenai kesehatan seksual dan reproduksi.',
          },
          {
            icon: '🧬',
            title: 'United Nations Population Fund (UNFPA)',
            description:
              'Advokasi hak kesehatan reproduksi dan dukungan layanan kesehatan global.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Jurnal Reproduksi Kesehatan Indonesia',
            description:
              '"Peran Pendidikan Seksual dalam Pencegahan Kehamilan Dini" - Studi lokal berbasis sekolah.',
          },
          {
            title: 'Reproductive Health Journal',
            description:
              '"Access to Reproductive Health Services in Developing Countries" - Analisis hambatan dan strategi global.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Informasi Kesehatan Reproduksi',
          items: [
            'Ami - Aplikasi edukasi remaja soal seksualitas dan reproduksi',
            'KlikDokter - Konsultasi kesehatan reproduksi online',
            'HaloNita - Informasi dan layanan kesehatan perempuan',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Kesehatan Reproduksi Remaja dan Dewasa"',
            '"Seksualitas Sehat dan Bertanggung Jawab"',
            '"Hak dan Kesehatan Reproduksi di Indonesia"',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi ini bersifat edukatif dan tidak menggantikan nasihat medis atau konseling profesional. Untuk pertanyaan seputar kesehatan reproduksi, konsultasikan dengan tenaga medis yang kompeten.',
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
