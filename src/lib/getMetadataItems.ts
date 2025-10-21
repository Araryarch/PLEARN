export const getMetadataItems = (
  templateTitle = '',
  templateDescription = '',
  slug = '',
) => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://yourdomain.com/'
      : 'http://localhost:3000'
  const pathname = baseUrl + slug
  const title = templateTitle ? `${templateTitle} | PLEARN` : 'PLEARN'
  const description = templateDescription
    ? 'Aplikasi TodoList With AI Paling Josjis loh ya cik, wkwkwk'
    : 'Aplikasi TodoList With AI Paling Josjis loh ya cik, wkwkwk'
  // const ogUrl = new URL(
  //   baseUrl + `/api/og?title=${templateTitle}&description=${description}`,
  // ).href;
  return {
    title,
    templateTitle,
    description,
    pathname,
    // ogUrl,
  }
}

export const generateTemplateMetadata = (
  templateTitle = '',
  templateDescription = '',
  slug = '',
) => {
  const metadataItems = getMetadataItems(
    templateTitle,
    templateDescription,
    slug,
  )
  return {
    title: metadataItems.title,
    alternates: {
      canonical: metadataItems.pathname,
    },
    openGraph: {
      url: metadataItems.pathname,
      // images: metadataItems.ogUrl,
    },
    twitter: {
      // images: metadataItems.ogUrl,
    },
  }
}
