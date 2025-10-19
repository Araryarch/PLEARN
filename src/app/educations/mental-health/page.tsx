'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Kesehatan Mental: Pilar Kehidupan yang Seimbang dan Produktif',
    subtitle:
      'Memahami pentingnya kesehatan mental sebagai dasar kesejahteraan emosional, psikologis, dan sosial dalam kehidupan sehari-hari.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Kesehatan Mental',
      icon: '📖',
      description:
        'Kesehatan mental adalah kondisi kesejahteraan emosional, psikologis, dan sosial di mana seseorang mampu mengelola stres, menjalin hubungan positif, bekerja secara produktif, serta berkontribusi kepada komunitasnya.',
      types: {
        title: 'Aspek Kesehatan Mental',
        items: [
          {
            title: 'Emosional',
            color: 'blue',
            description:
              'Kemampuan dalam mengenali, mengelola, dan mengekspresikan emosi secara sehat.',
          },
          {
            title: 'Psikologis',
            color: 'purple',
            description:
              'Kemampuan berpikir, merasa, dan bertindak sesuai dengan situasi hidup yang dihadapi.',
          },
          {
            title: 'Sosial',
            color: 'orange',
            description:
              'Kemampuan menjalin dan mempertahankan hubungan yang sehat dan bermakna.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Dasar Kesehatan Mental',
        description:
          'Kesehatan mental didasarkan pada penerimaan diri, ketahanan terhadap stres, keterampilan mengelola emosi, serta dukungan sosial yang positif. Pemeliharaannya melibatkan upaya sadar dan berkelanjutan.',
      },
      benefits: {
        title: 'Manfaat Menjaga Kesehatan Mental',
        items: [
          'Meningkatkan kualitas hidup dan kesejahteraan secara menyeluruh',
          'Meningkatkan produktivitas dan fokus dalam pekerjaan atau belajar',
          'Mendukung hubungan sosial yang lebih sehat',
          'Mencegah gangguan kesehatan mental seperti depresi dan kecemasan',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Apa tanda-tanda umum gangguan kesehatan mental?',
          answer:
            'Tanda-tanda umum meliputi perubahan suasana hati ekstrem, menarik diri dari lingkungan sosial, gangguan tidur, kelelahan berlebihan, perasaan cemas atau sedih terus-menerus, dan kehilangan minat pada aktivitas sehari-hari.',
        },
        {
          question:
            'Apa saja langkah sederhana untuk menjaga kesehatan mental sehari-hari?',
          answer:
            'Langkah-langkah sederhana meliputi tidur yang cukup, menjaga pola makan sehat, berolahraga secara rutin, meditasi, journaling, berbicara dengan orang terpercaya, dan menghindari konsumsi alkohol atau obat-obatan tanpa pengawasan medis.',
        },
        {
          question: 'Kapan perlu mencari bantuan profesional?',
          answer:
            'Jika merasa kewalahan, mengalami gangguan fungsi sehari-hari, atau memiliki pikiran untuk menyakiti diri sendiri atau orang lain, segera konsultasikan dengan psikolog, psikiater, atau konselor profesional.',
        },
        {
          question: 'Apa perbedaan antara stres dan gangguan kecemasan?',
          answer:
            'Stres adalah respon alami terhadap tekanan hidup, sedangkan gangguan kecemasan merupakan kondisi medis di mana perasaan cemas berlangsung terus-menerus dan mengganggu fungsi sehari-hari.',
        },
        {
          question: 'Apakah gangguan kesehatan mental bisa disembuhkan?',
          answer:
            'Banyak gangguan mental dapat dikelola dan bahkan dipulihkan dengan kombinasi terapi, dukungan sosial, perubahan gaya hidup, dan jika perlu, pengobatan medis. Pemulihan adalah proses yang unik bagi setiap individu.',
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
              'Informasi resmi mengenai kesehatan jiwa dan layanan psikologis di Indonesia.',
          },
          {
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Laporan dan panduan global tentang kesehatan mental dan dukungan psikososial.',
          },
          {
            icon: '🏢',
            title: 'American Psychological Association (APA)',
            description:
              'Sumber daya dan publikasi tentang penelitian serta praktik dalam kesehatan mental.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Jurnal Psikologi Klinis Indonesia',
            description:
              '"Intervensi Kognitif-Perilaku pada Gangguan Kecemasan" - Studi lokal tentang efektivitas terapi psikologis.',
          },
          {
            title: 'The Lancet Psychiatry',
            description:
              '"Global Mental Health: Challenges and Opportunities" - Perspektif internasional mengenai tantangan kesehatan mental.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Kesehatan Mental',
          items: [
            'Riliv - Meditasi dan konsultasi psikolog online',
            'Mindshine - Latihan mental dan mindfulness',
            'Moodpath - Pemantauan suasana hati dan jurnal emosional',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Mengelola Kecemasan dan Depresi: Panduan untuk Pemulihan"',
            '"Emotional Intelligence oleh Daniel Goleman"',
            '"Terapi Kognitif Perilaku untuk Pemula"',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi dalam artikel ini bersifat edukatif dan tidak menggantikan diagnosis atau terapi profesional. Konsultasikan dengan tenaga kesehatan jiwa berlisensi untuk kebutuhan spesifik Anda.',
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
