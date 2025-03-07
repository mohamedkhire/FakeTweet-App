/*
 * Project: FakeTweet App
 * Author: Mohamed Khire
 * Date: DEC 2024
 * Description: A fun app built with React and Next.js that allows users to generate realistic-looking fake tweets.
 * GitHub: https://github.com/mohamedkhire
 * Live: https://fake-tweet-app.vercel.app/
 */

import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Fake Tweet - Create Your Own Tweets</title>
        <meta name="title" content="Fake Tweet - Create Your Own Tweets" />
        <meta name="description" content="Create and customize your own fake tweets with the Fake Tweet app. Perfect for fun, testing, or creative projects!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fake-tweet-app.vercel.app/" />
        <meta property="og:title" content="Fake Tweet - Create Your Own Tweets" />
        <meta property="og:description" content="Create and customize your own fake tweets with the Fake Tweet app. Perfect for fun, testing, or creative projects!" />
        <meta property="og:image" content="https://i.ibb.co/Q9GvDfQ/faketweet.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fake-tweet-app.vercel.app/" />
        <meta property="twitter:title" content="Fake Tweet - Create Your Own Tweets" />
        <meta property="twitter:description" content="Create and customize your own fake tweets with the Fake Tweet app. Perfect for fun, testing, or creative projects!" />
        <meta property="twitter:image" content="https://i.ibb.co/Q9GvDfQ/faketweet.png" />
        <meta name="author" content="Mohamed Khire" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/twitter.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}