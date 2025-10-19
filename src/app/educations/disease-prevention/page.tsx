'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Pencegahan Penyakit: Kunci Hidup Sehat dan Berkualitas',
    subtitle:
      'Memahami pentingnya pencegahan penyakit sebagai langkah proaktif untuk menjaga kesehatan dan meningkatkan kualitas hidup',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Pencegahan Penyakit',
      icon: '📖',
      description:
        'Pencegahan penyakit adalah serangkaian tindakan dan strategi yang dilakukan untuk mengurangi risiko terjadinya penyakit, menghambat perkembangan penyakit, atau mencegah komplikasi yang dapat timbul dari suatu kondisi kesehatan.',
      types: {
        title: 'Jenis-jenis Pencegahan',
        items: [
          {
            title: 'Pencegahan Primer',
            color: 'green',
            description:
              'Mencegah penyakit sebelum terjadi melalui vaksinasi, pola hidup sehat, dan menghindari faktor risiko.',
          },
          {
            title: 'Pencegahan Sekunder',
            color: 'yellow',
            description:
              'Deteksi dini penyakit melalui skrining dan pemeriksaan rutin untuk pengobatan yang lebih efektif.',
          },
          {
            title: 'Pencegahan Tersier',
            color: 'red',
            description:
              'Mengurangi dampak penyakit yang sudah ada dan mencegah komplikasi lebih lanjut.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Dasar Pencegahan',
        description:
          'Pencegahan penyakit didasarkan pada pemahaman bahwa mencegah lebih baik daripada mengobati. Pendekatan ini melibatkan identifikasi faktor risiko, penerapan intervensi yang tepat, dan pemantauan berkelanjutan terhadap kondisi kesehatan.',
      },
      benefits: {
        title: 'Manfaat Pencegahan Penyakit',
        items: [
          'Mengurangi biaya perawatan kesehatan jangka panjang',
          'Meningkatkan kualitas hidup dan produktivitas',
          'Mengurangi beban pada sistem kesehatan',
          'Memperpanjang harapan hidup yang sehat',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question:
            'Apa saja langkah dasar pencegahan penyakit yang bisa dilakukan sehari-hari?',
          answer:
            'Langkah dasar meliputi: mencuci tangan secara teratur, menjaga kebersihan lingkungan, mengonsumsi makanan bergizi seimbang, berolahraga secara rutin, istirahat yang cukup, menghindari rokok dan alkohol berlebihan, serta melakukan pemeriksaan kesehatan berkala.',
        },
        {
          question: 'Seberapa penting vaksinasi dalam pencegahan penyakit?',
          answer:
            'Vaksinasi sangat penting sebagai pencegahan primer. Vaksin membantu tubuh membangun kekebalan terhadap penyakit tertentu sebelum terpapar patogen berbahaya. Program vaksinasi telah terbukti berhasil mengurangi atau bahkan mengeliminasi penyakit seperti polio, campak, dan difteri.',
        },
        {
          question:
            'Bagaimana cara mencegah penyakit tidak menular seperti diabetes dan hipertensi?',
          answer:
            'Pencegahan penyakit tidak menular fokus pada modifikasi gaya hidup: menjaga berat badan ideal, mengonsumsi makanan rendah gula dan garam, berolahraga minimal 150 menit per minggu, mengelola stres dengan baik, tidak merokok, dan membatasi konsumsi alkohol. Pemeriksaan rutin juga penting untuk deteksi dini.',
        },
        {
          question: 'Kapan sebaiknya melakukan pemeriksaan kesehatan rutin?',
          answer:
            'Frekuensi pemeriksaan tergantung usia dan faktor risiko. Umumnya, dewasa sehat disarankan melakukan pemeriksaan tahunan. Orang dengan faktor risiko tinggi atau berusia di atas 40 tahun mungkin perlu pemeriksaan lebih sering. Konsultasikan dengan dokter untuk menentukan jadwal yang tepat.',
        },
        {
          question: 'Bagaimana peran lingkungan dalam pencegahan penyakit?',
          answer:
            'Lingkungan berperan penting dalam pencegahan penyakit. Lingkungan bersih mengurangi risiko penyakit infeksi, kualitas udara yang baik mencegah penyakit pernapasan, akses air bersih mencegah penyakit yang ditularkan melalui air, dan lingkungan yang mendukung aktivitas fisik membantu mencegah penyakit tidak menular.',
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
              'Pedoman pencegahan dan pengendalian penyakit di Indonesia',
          },
          {
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Panduan global untuk pencegahan penyakit dan promosi kesehatan',
          },
          {
            icon: '🏢',
            title: 'Centers for Disease Control and Prevention (CDC)',
            description: 'Riset dan rekomendasi pencegahan penyakit terkini',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Jurnal Kesehatan Masyarakat Indonesia',
            description:
              '"Strategi Pencegahan Penyakit Tidak Menular di Indonesia" - Penelitian tentang efektivitas program pencegahan berbasis komunitas',
          },
          {
            title: 'The Lancet Global Health',
            description:
              '"Prevention of Non-Communicable Diseases in Low and Middle-Income Countries" - Studi komprehensif tentang pencegahan penyakit',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Kesehatan',
          items: [
            'Halodoc - Konsultasi kesehatan online',
            'Alodokter - Informasi kesehatan terpercaya',
            'SEHATQ - Platform kesehatan digital',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Pencegahan Penyakit dan Promosi Kesehatan"',
            '"Epidemiologi Penyakit Tidak Menular"',
            '"Gizi dan Kesehatan Masyarakat"',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi dalam artikel ini bersifat edukatif dan tidak menggantikan konsultasi medis profesional. Selalu konsultasikan kondisi kesehatan Anda dengan dokter atau tenaga kesehatan yang kompeten.',
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
