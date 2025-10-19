'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Kesehatan Lingkungan: Fondasi Hidup Sehat dan Berkelanjutan',
    subtitle:
      'Memahami pentingnya kesehatan lingkungan sebagai langkah proaktif untuk menjaga kualitas hidup manusia dan ekosistem sekitarnya.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Kesehatan Lingkungan',
      icon: '📖',
      description:
        'Kesehatan lingkungan adalah cabang kesehatan masyarakat yang fokus pada aspek-aspek lingkungan eksternal yang dapat memengaruhi kesehatan manusia, termasuk udara, air, tanah, serta faktor fisik, kimia, dan biologis lainnya.',
      types: {
        title: 'Fokus Utama Kesehatan Lingkungan',
        items: [
          {
            title: 'Kualitas Udara',
            color: 'green',
            description:
              'Menjaga kebersihan udara bebas dari polusi untuk mencegah penyakit pernapasan dan jantung.',
          },
          {
            title: 'Air dan Sanitasi',
            color: 'blue',
            description:
              'Penyediaan akses air bersih dan sanitasi yang baik untuk mencegah penyakit menular berbasis air.',
          },
          {
            title: 'Pengelolaan Limbah',
            color: 'orange',
            description:
              'Mengelola limbah rumah tangga dan industri secara tepat untuk mencegah kontaminasi lingkungan.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Dasar Kesehatan Lingkungan',
        description:
          'Prinsip dasar meliputi pencegahan paparan terhadap bahaya lingkungan, promosi perilaku hidup bersih dan sehat, serta pemantauan dan pengendalian faktor risiko lingkungan secara berkelanjutan.',
      },
      benefits: {
        title: 'Manfaat Kesehatan Lingkungan',
        items: [
          'Mengurangi risiko penyakit akibat lingkungan tercemar',
          'Meningkatkan kualitas hidup dan kesejahteraan masyarakat',
          'Melindungi ekosistem dan keanekaragaman hayati',
          'Mendukung pembangunan berkelanjutan dan kota yang layak huni',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question:
            'Apa saja contoh masalah kesehatan lingkungan di sekitar kita?',
          answer:
            'Contohnya termasuk polusi udara dari kendaraan bermotor, pencemaran air akibat limbah industri, sanitasi buruk di pemukiman padat, serta paparan bahan kimia berbahaya di lingkungan kerja.',
        },
        {
          question: 'Mengapa penting menjaga kualitas udara di lingkungan?',
          answer:
            'Kualitas udara yang buruk dapat menyebabkan berbagai gangguan kesehatan seperti asma, bronkitis, hingga penyakit jantung dan kanker paru. Upaya seperti menanam pohon dan mengurangi emisi kendaraan sangat penting.',
        },
        {
          question:
            'Bagaimana cara mencegah pencemaran air di lingkungan rumah?',
          answer:
            'Hindari membuang limbah cair dan sampah ke saluran air, gunakan deterjen ramah lingkungan, dan pastikan sistem septic tank berfungsi baik. Edukasi masyarakat juga penting untuk menjaga sumber air bersih.',
        },
        {
          question:
            'Apa hubungan antara perubahan iklim dan kesehatan lingkungan?',
          answer:
            'Perubahan iklim dapat memperburuk kondisi lingkungan seperti peningkatan suhu, polusi udara, dan bencana alam. Hal ini berdampak langsung pada kesehatan manusia melalui meningkatnya risiko penyakit infeksi, stres panas, dan malnutrisi.',
        },
        {
          question:
            'Bagaimana peran individu dalam menjaga kesehatan lingkungan?',
          answer:
            'Individu dapat berperan melalui kebiasaan sehari-hari seperti mengurangi sampah plastik, hemat energi dan air, tidak membakar sampah, serta ikut serta dalam program kebersihan lingkungan.',
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
            title: 'Kementerian Lingkungan Hidup dan Kehutanan RI',
            description:
              'Sumber informasi dan regulasi terkait pengelolaan lingkungan hidup di Indonesia.',
          },
          {
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Panduan dan laporan global tentang kesehatan lingkungan dan perubahan iklim.',
          },
          {
            icon: '🏢',
            title: 'United Nations Environment Programme (UNEP)',
            description:
              'Laporan dan kebijakan global terkait lingkungan dan kesehatan manusia.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Jurnal Lingkungan dan Kesehatan Masyarakat',
            description:
              '"Dampak Pencemaran Udara terhadap Kesehatan Anak di Perkotaan" - Studi kasus di kota-kota besar di Indonesia.',
          },
          {
            title: 'Environmental Health Perspectives',
            description:
              '"Climate Change and Human Health" - Analisis global tentang dampak kesehatan dari perubahan iklim.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Pemantauan Lingkungan',
          items: [
            'AirVisual - Pemantauan kualitas udara real-time',
            'Trash Hero - Edukasi pengelolaan sampah',
            'EcoLife - Gaya hidup ramah lingkungan',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Kesehatan Lingkungan dan Pembangunan Berkelanjutan"',
            '"Ekologi dan Kesehatan Manusia"',
            '"Manajemen Limbah dan Kesehatan Lingkungan"',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi dalam artikel ini bersifat edukatif dan tidak menggantikan nasihat profesional di bidang lingkungan atau kesehatan. Konsultasikan dengan ahli lingkungan atau tenaga kesehatan terkait untuk penanganan spesifik.',
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
