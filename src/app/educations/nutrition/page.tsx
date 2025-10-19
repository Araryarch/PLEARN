'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Nutrisi Seimbang: Fondasi Tubuh Sehat dan Bertenaga',
    subtitle:
      'Memahami pentingnya asupan nutrisi yang tepat sebagai kunci untuk menjaga kesehatan, mencegah penyakit, dan meningkatkan kualitas hidup.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Nutrisi',
      icon: '📖',
      description:
        'Nutrisi adalah proses di mana tubuh memperoleh dan menggunakan zat gizi dari makanan untuk mendukung fungsi tubuh, pertumbuhan, dan pemeliharaan kesehatan. Nutrisi yang baik penting untuk energi, perkembangan sel, dan sistem kekebalan tubuh.',
      types: {
        title: 'Jenis Zat Gizi',
        items: [
          {
            title: 'Makronutrien',
            color: 'green',
            description:
              'Karbohidrat, protein, dan lemak yang dibutuhkan dalam jumlah besar untuk energi dan fungsi tubuh.',
          },
          {
            title: 'Mikronutrien',
            color: 'yellow',
            description:
              'Vitamin dan mineral yang dibutuhkan dalam jumlah kecil namun sangat penting untuk metabolisme dan sistem kekebalan.',
          },
          {
            title: 'Air',
            color: 'blue',
            description:
              'Komponen vital yang menjaga keseimbangan cairan, suhu tubuh, dan proses biologis lainnya.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Dasar Nutrisi Seimbang',
        description:
          'Nutrisi seimbang melibatkan konsumsi berbagai jenis makanan dengan proporsi yang tepat untuk memenuhi kebutuhan energi dan zat gizi. Prinsip ini mencakup variasi, moderasi, dan kecukupan.',
      },
      benefits: {
        title: 'Manfaat Nutrisi yang Baik',
        items: [
          'Menjaga berat badan ideal dan komposisi tubuh sehat',
          'Meningkatkan energi dan daya tahan tubuh',
          'Mendukung pertumbuhan dan perkembangan optimal',
          'Mencegah penyakit kronis seperti diabetes, hipertensi, dan penyakit jantung',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Apa itu pola makan seimbang?',
          answer:
            'Pola makan seimbang mencakup asupan karbohidrat, protein, lemak sehat, vitamin, mineral, serta air dalam jumlah yang sesuai. Porsi sayur, buah, biji-bijian, dan protein nabati/hewani disarankan dalam setiap kali makan.',
        },
        {
          question: 'Apakah semua lemak buruk bagi kesehatan?',
          answer:
            'Tidak. Lemak sehat seperti lemak tak jenuh (dari ikan, kacang, dan alpukat) penting untuk tubuh. Lemak trans dan lemak jenuh dalam jumlah berlebihan justru harus dihindari karena meningkatkan risiko penyakit jantung.',
        },
        {
          question: 'Berapa banyak air yang sebaiknya dikonsumsi per hari?',
          answer:
            'Umumnya 8 gelas atau sekitar 2 liter per hari, namun kebutuhan dapat berbeda tergantung usia, aktivitas, dan kondisi cuaca. Tubuh yang terhidrasi baik membantu fungsi otak dan pencernaan.',
        },
        {
          question: 'Bagaimana cara mengetahui kekurangan zat gizi tertentu?',
          answer:
            'Gejalanya bisa meliputi kelelahan, kulit pucat, gangguan konsentrasi, rambut rontok, atau imunitas menurun. Tes darah dan konsultasi dengan ahli gizi atau dokter diperlukan untuk diagnosis akurat.',
        },
        {
          question: 'Apakah suplemen makanan diperlukan?',
          answer:
            'Suplemen bisa membantu jika asupan makanan tidak mencukupi atau dalam kondisi tertentu (kehamilan, penyakit, kekurangan gizi). Namun, konsumsi suplemen harus berdasarkan rekomendasi profesional kesehatan.',
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
              'Panduan gizi seimbang dan pedoman konsumsi makanan sehat di Indonesia.',
          },
          {
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Rekomendasi global tentang asupan gizi, pola makan sehat, dan pencegahan kekurangan gizi.',
          },
          {
            icon: '🥗',
            title: 'Food and Agriculture Organization (FAO)',
            description:
              'Sumber informasi tentang ketahanan pangan, nutrisi, dan keberlanjutan pangan.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Jurnal Gizi Klinik Indonesia',
            description:
              '"Evaluasi Pola Makan Anak Sekolah di Indonesia" - Studi tentang kebiasaan makan dan status gizi anak.',
          },
          {
            title: 'The American Journal of Clinical Nutrition',
            description:
              '"Role of Micronutrients in Human Health" - Penelitian mendalam tentang pentingnya vitamin dan mineral.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Nutrisi',
          items: [
            'MyFitnessPal - Pemantau asupan kalori dan nutrisi',
            'YAZIO - Rencana diet dan pencatatan makanan',
            'Gizi Seimbang Kemenkes - Informasi gizi resmi Indonesia',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Panduan Gizi Seimbang untuk Semua Usia"',
            '"Ilmu Gizi Dasar oleh Dr. Sri Sukmaniah"',
            '"Diet dan Nutrisi dalam Kehidupan Sehari-hari"',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi ini bersifat edukatif dan bukan pengganti saran medis atau konsultasi ahli gizi. Untuk kebutuhan khusus, selalu konsultasikan dengan tenaga kesehatan profesional.',
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
