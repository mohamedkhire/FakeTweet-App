/*
 * Project: FakeTweet App
 * Author: Mohamed Khire
 * Date: DEC 2024
 * Description: A fun app built with React and Next.js that allows users to generate realistic-looking fake tweets.
 * GitHub: https://github.com/mohamedkhire
 * Live: https://fake-tweet-app.vercel.app/
 */


/*
 * Project: FakeTweet App
 * Author: Mohamed Khire
 * Date: Mar 2025
 * Description: A fun app built with React and Next.js that allows users to generate realistic-looking fake tweets.
 * GitHub: https://github.com/mohamedkhire
 * Live: https://faketweet-app.vercel.app/
 */

import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, MessageCircle, Info } from 'lucide-react'
import Head from 'next/head'

export default function LandingPage() {
  return (


      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
               <a href="/"><span className="ml-2 text-2xl font-bold text-dark-600">Fake Tweet</span></a> 
              </div>
              <div className="flex items-center space-x-4">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hidden sm:inline-flex items-center">
                        Product
                        <Info className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80">
                      <div className="flex items-start space-x-3 p-2">
                        <div className="rounded-full bg-dark-100 p-2">
                          <MessageCircle className="h-5 w-5 text-dark-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Fake Tweet</h3>
                          <p className="text-sm text-muted-foreground">Create your own fake tweet with just a snap of finger</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Developed by: <a href="https://mohamedkhire.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline">Mohamed Khire</a>
                          </p>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                <a href="https://mohamedkhire.vercel.app/" target='_blank'><Button variant="outline">Contact</Button></a> 
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
            Made with 🖤 by  <a href="https://mohamedkhire.vercel.app/" className="hover:underline">Mohamed Khire</a>
            </p>
          </div>
        </footer>
      </div>

  )
}
