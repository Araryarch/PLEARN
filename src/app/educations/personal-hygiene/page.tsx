'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Kebersihan Pribadi: Dasar Hidup Sehat dan Percaya Diri',
    subtitle:
      'Memahami pentingnya menjaga kebersihan diri sebagai langkah utama dalam menjaga kesehatan fisik dan mental.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Kebersihan Pribadi',
      icon: '📖',
      description:
        'Kebersihan pribadi adalah praktik menjaga tubuh dan lingkungan sekitar agar tetap bersih untuk mencegah penyakit dan menjaga kesehatan secara keseluruhan. Hal ini mencakup kebiasaan sehari-hari seperti mandi, mencuci tangan, dan merawat kebersihan mulut.',
      types: {
        title: 'Aspek Kebersihan Pribadi',
        items: [
          {
            title: 'Kebersihan Tubuh',
            color: 'blue',
            description:
              'Meliputi mandi rutin, membersihkan ketiak dan organ intim, serta menggunakan pakaian bersih untuk mencegah bau badan dan infeksi kulit.',
          },
          {
            title: 'Kebersihan Tangan dan Kuku',
            color: 'green',
            description:
              'Mencuci tangan dengan sabun setelah buang air, sebelum makan, dan setelah menyentuh benda kotor untuk mencegah penyebaran penyakit.',
          },
          {
            title: 'Kebersihan Mulut',
            color: 'yellow',
            description:
              'Menyikat gigi dua kali sehari, membersihkan lidah, dan rutin periksa ke dokter gigi untuk mencegah gigi berlubang dan penyakit gusi.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Dasar Kebersihan Pribadi',
        description:
          'Kebersihan pribadi mencerminkan kesadaran individu dalam menjaga kesehatannya sendiri dan lingkungan sekitar. Konsistensi, pemahaman risiko kesehatan, dan penerapan kebiasaan baik adalah kunci utama.',
      },
      benefits: {
        title: 'Manfaat Menjaga Kebersihan Pribadi',
        items: [
          'Mencegah infeksi dan penyakit menular',
          'Meningkatkan rasa percaya diri dan kenyamanan sosial',
          'Mendukung kesehatan kulit dan organ tubuh lainnya',
          'Menjaga lingkungan tetap bersih dan sehat',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Mengapa mencuci tangan sangat penting?',
          answer:
            'Tangan adalah media utama penyebaran kuman. Mencuci tangan dengan sabun menghilangkan mikroorganisme berbahaya yang dapat menyebabkan penyakit seperti diare, flu, dan infeksi kulit.',
        },
        {
          question: 'Seberapa sering sebaiknya mandi?',
          answer:
            'Idealnya mandi dilakukan dua kali sehari, terutama setelah aktivitas berat atau saat cuaca panas, untuk menghilangkan keringat, kuman, dan menjaga kesegaran tubuh.',
        },
        {
          question: 'Apakah perlu menggunakan sabun antibakteri?',
          answer:
            'Sabun biasa sudah cukup efektif. Sabun antibakteri boleh digunakan, tetapi penggunaannya berlebihan bisa mengganggu keseimbangan bakteri baik pada kulit.',
        },
        {
          question: 'Bagaimana menjaga kebersihan saat menstruasi?',
          answer:
            'Gunakan pembalut bersih, ganti setiap 4-6 jam, dan cuci area kewanitaan dengan air bersih. Jaga kebersihan tangan sebelum dan sesudah mengganti pembalut.',
        },
        {
          question: 'Apa dampak buruk dari kebersihan pribadi yang buruk?',
          answer:
            'Dapat menyebabkan berbagai masalah seperti bau badan, jerawat, infeksi kulit, gangguan pencernaan, bahkan masalah sosial dan psikologis akibat kurangnya rasa percaya diri.',
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
              'Kampanye dan panduan nasional terkait perilaku hidup bersih dan sehat (PHBS).',
          },
          {
            icon: '🌍',
            title: 'World Health Organization (WHO)',
            description:
              'Pedoman global mengenai kebersihan pribadi dan pencegahan penyakit menular.',
          },
          {
            icon: '🧼',
            title: 'UNICEF',
            description:
              'Materi edukatif tentang pentingnya kebersihan bagi anak-anak dan keluarga.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Jurnal Kesehatan Lingkungan',
            description:
              '"Pengaruh Kebersihan Pribadi Terhadap Kejadian Infeksi Kulit" - Penelitian tentang dampak perilaku kebersihan pada kesehatan masyarakat.',
          },
          {
            title: 'BMC Public Health',
            description:
              '"Hand Hygiene Behavior and Its Impact on Disease Prevention" - Studi global tentang cuci tangan dan penurunan risiko infeksi.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Kebersihan dan Kesehatan',
          items: [
            'Sehat IndonesiaKu - Tips PHBS dan kebersihan keluarga',
            'Lifebuoy App - Edukasi cuci tangan dan kebersihan',
            'Clean Habit Tracker - Monitor kebiasaan kebersihan pribadi',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Panduan Perilaku Hidup Bersih dan Sehat (PHBS)"',
            '"Kesehatan Lingkungan dan Kebersihan Pribadi"',
            '"Hidup Sehat dari Diri Sendiri"',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi ini disediakan untuk tujuan edukatif. Untuk masalah kesehatan spesifik, selalu konsultasikan dengan dokter atau petugas kesehatan yang kompeten.',
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
