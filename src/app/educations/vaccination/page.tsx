'use client'

import Layouts from '@/Layouts/Layouts'
import React, { useState } from 'react'

type SectionId = 'definition' | 'questions' | 'references'

const content: PageContent = {
  header: {
    title: 'Vaksinasi: Perlindungan Proaktif untuk Kesehatan Masyarakat',
    subtitle:
      'Memahami pentingnya vaksinasi sebagai langkah pencegahan utama terhadap penyakit menular dan dampaknya bagi kesehatan global.',
  },
  navigation: [
    { id: 'definition', label: '📖 Definisi' },
    { id: 'questions', label: '❓ Pertanyaan Umum' },
    { id: 'references', label: '📚 Referensi' },
  ],
  sections: {
    definition: {
      title: 'Definisi Vaksinasi',
      icon: '📖',
      description:
        'Vaksinasi adalah proses pemberian vaksin ke dalam tubuh untuk merangsang sistem imun agar membentuk kekebalan terhadap penyakit tertentu, tanpa harus terinfeksi terlebih dahulu.',
      types: {
        title: 'Jenis Vaksin Berdasarkan Fungsi dan Komposisi',
        items: [
          {
            title: 'Vaksin Hidup yang Dilemahkan',
            color: 'green',
            description:
              'Mengandung virus atau bakteri hidup yang dilemahkan, seperti vaksin campak dan BCG.',
          },
          {
            title: 'Vaksin Inaktif',
            color: 'blue',
            description:
              'Mengandung virus atau bakteri yang sudah mati, seperti vaksin polio inaktif dan hepatitis A.',
          },
          {
            title: 'Vaksin Subunit dan Toksid',
            color: 'yellow',
            description:
              'Mengandung bagian tertentu dari mikroorganisme, seperti vaksin HPV dan difteri-tetanus.',
          },
          {
            title: 'Vaksin mRNA dan Vektor Virus',
            color: 'purple',
            description:
              'Teknologi terbaru yang digunakan pada vaksin COVID-19 seperti Pfizer dan AstraZeneca.',
          },
        ],
      },
      principles: {
        title: 'Prinsip dan Tujuan Vaksinasi',
        description:
          'Vaksinasi bertujuan membentuk kekebalan individu dan kelompok (herd immunity) untuk menghentikan penyebaran penyakit menular. Prinsip utamanya adalah pencegahan melalui imunisasi yang aman dan efektif.',
      },
      benefits: {
        title: 'Manfaat Vaksinasi',
        items: [
          'Melindungi diri dari penyakit berbahaya dan komplikasinya',
          'Menurunkan angka kesakitan dan kematian',
          'Mencapai kekebalan kelompok dalam populasi',
          'Mengurangi beban ekonomi dan sosial akibat penyakit',
        ],
      },
    },
    questions: {
      title: 'Pertanyaan Umum',
      icon: '❓',
      items: [
        {
          question: 'Apakah vaksin aman untuk semua orang?',
          answer:
            'Vaksin yang telah mendapat izin edar sudah melalui uji keamanan dan efektivitas yang ketat. Namun, individu dengan kondisi medis tertentu sebaiknya berkonsultasi dengan dokter sebelum divaksin.',
        },
        {
          question: 'Apakah vaksinasi bisa menyebabkan penyakit?',
          answer:
            'Tidak. Vaksin tidak menyebabkan penyakit yang dicegahnya, karena sebagian besar hanya mengandung bagian mikroorganisme yang tidak aktif atau dilemahkan.',
        },
        {
          question: 'Mengapa masih bisa sakit meskipun sudah divaksin?',
          answer:
            'Vaksin tidak 100% mencegah infeksi, namun dapat mengurangi tingkat keparahan penyakit dan risiko komplikasi. Kekebalan juga dapat menurun seiring waktu, tergantung jenis vaksin.',
        },
        {
          question: 'Apakah perlu vaksinasi saat dewasa?',
          answer:
            'Ya. Beberapa vaksin direkomendasikan ulang saat dewasa seperti vaksin flu tahunan, hepatitis, dan HPV. Selain itu, vaksinasi penting bagi lansia dan kelompok berisiko tinggi.',
        },
        {
          question: 'Apa itu imunisasi wajib?',
          answer:
            'Imunisasi wajib adalah vaksinasi yang harus diberikan pada anak sesuai program nasional, seperti vaksin BCG, DPT, polio, dan campak, untuk mencegah wabah penyakit menular.',
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
              'Pedoman global tentang vaksinasi dan program imunisasi.',
          },
          {
            icon: '🏥',
            title: 'Kementerian Kesehatan RI',
            description:
              'Program imunisasi nasional dan informasi vaksin resmi di Indonesia.',
          },
          {
            icon: '🏛️',
            title: 'UNICEF',
            description:
              'Dukungan vaksinasi anak-anak dan populasi rentan di seluruh dunia.',
          },
        ],
      },
      publications: {
        title: 'Publikasi Ilmiah',
        items: [
          {
            title: 'The Lancet Infectious Diseases',
            description:
              '"Global Impact of Vaccination" – Studi tentang efektivitas vaksin dalam menurunkan angka kematian dan penyakit.',
          },
          {
            title: 'Journal of Vaccine',
            description:
              '"Advances in Vaccine Technology" – Perkembangan terbaru dalam teknologi dan distribusi vaksin.',
          },
        ],
      },
      guides: {
        title: 'Panduan Praktis',
        apps: {
          title: '📱 Aplikasi Kesehatan',
          items: [
            'SehatPedia – Info jadwal dan jenis imunisasi',
            'Alodokter – Konsultasi vaksinasi secara online',
            'PeduliLindungi – Riwayat vaksin COVID-19 dan pelacakan risiko',
          ],
        },
        books: {
          title: '📖 Buku Referensi',
          items: [
            '"Imunisasi: Panduan Lengkap untuk Orang Tua"',
            '"Vaccine: The Debate in Modern Society"',
            '"The Vaccine Book" oleh Dr. Robert W. Sears',
          ],
        },
      },
      disclaimer: {
        title: 'Disclaimer',
        description:
          'Informasi ini bersifat edukatif dan tidak menggantikan nasihat medis profesional. Untuk keputusan vaksinasi, selalu konsultasikan dengan tenaga kesehatan terpercaya.',
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
