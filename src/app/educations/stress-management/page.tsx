'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Manajemen Stres: Kunci Menjaga Kesehatan Mental dan Fisik',
    subtitle:
      'Mengenal cara efektif mengelola stres untuk meningkatkan kesejahteraan hidup dan mencegah gangguan kesehatan.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Manajemen Stres',
      icon: '📖',
      description:
        'Manajemen stres adalah serangkaian strategi dan teknik yang digunakan untuk mengendalikan tingkat stres individu, meningkatkan ketahanan mental, dan menjaga keseimbangan emosi dalam kehidupan sehari-hari.',
      types: {
        title: 'Teknik-Teknik Manajemen Stres',
        items: [
          {
            title: 'Relaksasi dan Meditasi',
            color: 'blue',
            description:
              'Menggunakan teknik seperti pernapasan dalam, meditasi mindfulness, atau yoga untuk menenangkan pikiran dan tubuh.',
          },
          {
            title: 'Manajemen Waktu',
            color: 'green',
            description:
              'Mengatur prioritas dan membuat jadwal yang realistis agar tidak merasa kewalahan oleh tugas.',
          },
          {
            title: 'Aktivitas Fisik',
            color: 'orange',
            description:
              'Berolahraga secara rutin untuk melepaskan hormon endorfin yang membantu meningkatkan suasana hati.',
          },
          {
            title: 'Dukungan Sosial',
            color: 'purple',
            description:
              'Berbicara dengan teman, keluarga, atau konselor dapat membantu mengurangi beban emosional.',
          },
        ],
      },
      principles: {
        title: 'Prinsip Dasar Manajemen Stres',
        description:
          'Stres adalah respons alami tubuh, namun jika tidak dikelola dengan baik dapat berdampak negatif terhadap kesehatan. Prinsip utama dalam manajemen stres adalah mengenali penyebab stres, memahami respons pribadi, dan menerapkan strategi yang sesuai.',
      },
      benefits: {
        title: 'Manfaat Manajemen Stres yang Efektif',
        items: [
          'Meningkatkan fokus dan produktivitas',
          'Menjaga kesehatan jantung dan tekanan darah',
          'Mengurangi risiko gangguan mental seperti kecemasan dan depresi',
          'Memperbaiki kualitas tidur',
          'Meningkatkan hubungan interpersonal',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Apa saja tanda-tanda stres berlebihan?',
          answer:
            'Beberapa tanda termasuk mudah marah, sulit tidur, kelelahan terus-menerus, sakit kepala, dan merasa tidak berdaya atau cemas berlebihan.',
        },
        {
          question: 'Kapan harus mencari bantuan profesional?',
          answer:
            'Jika stres mengganggu aktivitas sehari-hari, hubungan sosial, atau menyebabkan gejala fisik atau mental yang berat, penting untuk berkonsultasi dengan psikolog atau psikiater.',
        },
        {
          question: 'Apakah stres selalu berdampak negatif?',
          answer:
            'Tidak selalu. Stres jangka pendek (eustress) bisa memotivasi dan meningkatkan kinerja. Namun, stres kronis bisa berbahaya bagi kesehatan.',
        },
        {
          question: 'Bagaimana peran tidur dalam manajemen stres?',
          answer:
            'Tidur yang cukup dan berkualitas membantu tubuh dan otak pulih dari tekanan. Kurang tidur dapat memperburuk stres dan emosi negatif.',
        },
        {
          question: 'Apakah journaling bisa membantu mengelola stres?',
          answer:
            'Ya. Menulis jurnal bisa membantu melepaskan emosi, memahami pola pikir, dan menemukan solusi terhadap masalah yang menimbulkan stres.',
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
              'Pedoman global dalam promosi kesehatan mental dan manajemen stres.',
          },
          {
            icon: '🏥',
            title: 'Kementerian Kesehatan RI',
            description:
              'Kampanye dan program dukungan kesehatan mental di Indonesia.',
          },
          {
            icon: '🧠',
            title: 'American Psychological Association (APA)',
            description:
              'Informasi ilmiah dan praktik terbaik untuk mengatasi stres.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'Journal of Stress and Health',
            description:
              '"Cognitive Behavioral Approaches to Stress Management" – Studi tentang efektivitas pendekatan kognitif dalam mengelola stres.',
          },
          {
            title: 'Mental Health Review Journal',
            description:
              '"Community-Based Interventions for Stress Reduction" – Kajian program berbasis komunitas dalam manajemen stres.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Bantu Stres',
          items: [
            'Mindshift CBT – Dukungan manajemen stres berbasis CBT',
            'Insight Timer – Meditasi dan relaksasi gratis',
            'Sanvello – Pelacak suasana hati dan latihan stres',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"The Stress-Proof Brain" oleh Melanie Greenberg',
            '"Full Catastrophe Living" oleh Jon Kabat-Zinn',
            '"Burnout: The Secret to Unlocking the Stress Cycle" oleh Emily dan Amelia Nagoski',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi ini disediakan untuk tujuan edukatif dan bukan pengganti konsultasi medis atau psikologis profesional. Jika Anda merasa kewalahan oleh stres, segera cari bantuan ahli.',
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
