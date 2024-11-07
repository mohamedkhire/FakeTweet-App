import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, MessageCircle } from 'lucide-react'
import Head from 'next/head'

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Fake Tweet App - Create Realistic Fake Tweets Easily</title>
        <meta name="title" content="Fake Tweet App - Create Realistic Fake Tweets Easily" />
        <meta name="description" content="Fake Tweet App lets you generate realistic fake tweets for fun, memes, and social media mockups. Customize text, username, and more!" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fake-tweet-app.vercel.app/" />
        <meta property="og:title" content="Fake Tweet App - Create Realistic Fake Tweets Easily" />
        <meta property="og:description" content="Fake Tweet App lets you generate realistic fake tweets for fun, memes, and social media mockups. Customize text, username, and more!" />
        <meta property="og:image" content="https://i.ibb.co/Q9GvDfQ/faketweet.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fake-tweet-app.vercel.app/" />
        <meta property="twitter:title" content="Fake Tweet App - Create Realistic Fake Tweets Easily" />
        <meta property="twitter:description" content="Fake Tweet App lets you generate realistic fake tweets for fun, memes, and social media mockups. Customize text, username, and more!" />
        <meta property="twitter:image" content="https://i.ibb.co/Q9GvDfQ/faketweet.png" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="ml-2 text-2xl font-bold text-dark-600">Fake Tweet</span>
              </div>
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden sm:inline-flex items-center">
                      Product
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80">
                    <div className="flex items-start space-x-3 p-2">
                      <div className="rounded-full bg-purple-100 p-2">
                        <MessageCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Fake Tweet</h3>
                        <p className="text-sm text-muted-foreground">Create your own fake tweet with just a snap of finger</p>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <a href="https://mohamedkhire.vercel.app/"><Button variant="outline">Contact</Button></a> 
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900">
                Create Your <span className="text-dark-600">Tweet</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base sm:text-lg text-gray-500 sm:max-w-3xl">
                Design and share custom tweets effortlessly. Perfect for mockups, presentations, or just for fun!
              </p>
              <div className="mt-10 sm:mt-12">
                <Link href="/create-tweet" passHref>
                  <Button size="lg" className="text-lg px-8 py-3">
                    Make a Tweet
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © 2024 <a href="https://mohamedkhire.vercel.app/">Mohamed Khire.</a> All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
