'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Kebiasaan Tidur Sehat: Fondasi untuk Kesehatan Fisik dan Mental',
    subtitle:
      'Menjaga pola tidur yang baik adalah kunci untuk meningkatkan kualitas hidup dan mencegah berbagai gangguan kesehatan.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Kebiasaan Tidur Sehat',
      icon: '📖',
      description:
        'Kebiasaan tidur sehat merujuk pada rutinitas dan lingkungan tidur yang mendukung kualitas tidur optimal, termasuk durasi, konsistensi waktu tidur, dan kebersihan tidur (sleep hygiene).',
      types: {
        title: 'Komponen Kebiasaan Tidur Sehat',
        items: [
          {
            title: 'Durasi Tidur yang Cukup',
            color: 'blue',
            description:
              'Tidur 7–9 jam per malam untuk dewasa, atau sesuai kebutuhan berdasarkan usia dan aktivitas.',
          },
          {
            title: 'Konsistensi Jadwal Tidur',
            color: 'indigo',
            description:
              'Tidur dan bangun pada waktu yang sama setiap hari, termasuk akhir pekan.',
          },
          {
            title: 'Kebersihan Tidur (Sleep Hygiene)',
            color: 'cyan',
            description:
              'Menjaga lingkungan tidur yang nyaman dan bebas gangguan seperti cahaya terang atau suara bising.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Dasar Tidur Berkualitas',
        description:
          'Tidur berkualitas memengaruhi sistem kekebalan tubuh, kesehatan mental, dan konsentrasi. Penting untuk memiliki rutinitas malam yang menenangkan dan menghindari konsumsi kafein, penggunaan gawai, serta aktivitas berat sebelum tidur.',
      },
      benefits: {
        title: 'Manfaat Kebiasaan Tidur Sehat',
        items: [
          'Meningkatkan daya ingat dan konsentrasi',
          'Menjaga keseimbangan hormon dan metabolisme',
          'Memperkuat sistem imun tubuh',
          'Menurunkan risiko penyakit kronis seperti diabetes dan hipertensi',
          'Mendukung kesehatan mental dan emosional',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Berapa lama idealnya tidur setiap malam?',
          answer:
            'Untuk orang dewasa, 7–9 jam per malam adalah durasi tidur yang direkomendasikan. Anak-anak dan remaja memerlukan lebih banyak, sementara lansia bisa cukup dengan 6–8 jam.',
        },
        {
          question: 'Apa itu sleep hygiene dan mengapa penting?',
          answer:
            'Sleep hygiene adalah praktik kebiasaan tidur sehat, seperti menjaga jadwal tidur, menghindari layar gawai sebelum tidur, serta menciptakan lingkungan tidur yang nyaman dan gelap. Ini penting untuk mendapatkan tidur yang nyenyak dan berkualitas.',
        },
        {
          question: 'Apa dampak kurang tidur terhadap tubuh?',
          answer:
            'Kurang tidur dapat menyebabkan kelelahan, menurunnya daya tahan tubuh, gangguan suasana hati, penurunan produktivitas, dan dalam jangka panjang meningkatkan risiko penyakit kronis.',
        },
        {
          question: 'Bagaimana cara meningkatkan kualitas tidur?',
          answer:
            'Beberapa cara termasuk membuat rutinitas tidur yang konsisten, menghindari konsumsi kafein di sore hari, tidak menggunakan ponsel menjelang tidur, dan menciptakan kamar tidur yang tenang dan sejuk.',
        },
        {
          question: 'Apakah tidur siang bermanfaat?',
          answer:
            'Tidur siang singkat (20–30 menit) dapat meningkatkan energi dan fokus. Namun, tidur siang terlalu lama atau terlalu sore bisa mengganggu tidur malam.',
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
            icon: '🛌',
            title: 'National Sleep Foundation',
            description:
              'Panduan dan riset tentang pentingnya tidur dan kebiasaan tidur sehat.',
          },
          {
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Informasi tentang hubungan antara tidur dan kesehatan masyarakat.',
          },
          {
            icon: '🏥',
            title: 'Kementerian Kesehatan RI',
            description:
              'Kampanye nasional untuk meningkatkan kesadaran pentingnya pola tidur sehat.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Journal of Sleep Research',
            description:
              '"Sleep Duration and Health Outcomes" – Studi hubungan antara pola tidur dan risiko penyakit.',
          },
          {
            title: 'Sleep Medicine Reviews',
            description:
              '"Interventions to Improve Sleep Hygiene" – Kajian ilmiah tentang efektivitas strategi tidur sehat.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Pendukung Tidur',
          items: [
            'Sleep Cycle – Pelacak tidur dan alarm pintar',
            'Calm – Relaksasi dan meditasi sebelum tidur',
            'Headspace – Panduan tidur dan mindfulness',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Why We Sleep" oleh Matthew Walker',
            '"Sleep Smarter" oleh Shawn Stevenson',
            '"The Sleep Solution" oleh W. Chris Winter',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi ini bersifat edukatif dan tidak menggantikan diagnosis atau saran medis. Jika Anda mengalami gangguan tidur serius, konsultasikan dengan tenaga kesehatan profesional.',
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
