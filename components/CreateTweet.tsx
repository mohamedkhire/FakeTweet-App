'use client'

import React, { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Repeat2, Heart, Bookmark, Upload, ChevronDown, BadgeCheck, Calendar as CalendarIcon, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { toPng } from 'html-to-image'
import { format } from "date-fns"
import Link from 'next/link'

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const initialState = {
  activeTab: "edit",
  tweetText: "",
  name: "",
  username: "",
  isVerified: false,
  userPhoto: "/placeholder.svg?height=48&width=48",
  tweetPhoto: "",
  date: new Date(),
  time: { hour: "12", minute: "00", period: "AM" },
  views: 0,  // Change to number
  replies: 0,  // Change to number
  retweets: 0,  // Change to number
  likes: 0,  // Change to number
  bookmarks: 0,  // Change to number
  isDarkMode: false,
  backgroundColor: "linear-gradient(to bottom right, #4F46E5, #7C3AED)",
  showBackground: true,
}

const backgroundPresets = [
  { name: "Purple", value: "linear-gradient(to bottom right, #4F46E5, #7C3AED)" },
  { name: "Blue", value: "linear-gradient(to bottom right, #2563EB, #3B82F6)" },
  { name: "Dark", value: "linear-gradient(to bottom, #111827, #1F2937)" },
  { name: "Light", value: "linear-gradient(to bottom, #F3F4F6, #E5E7EB)" },
]

export default function CreateTweet() {
  const [state, setState] = useState(initialState)
  const tweetRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: 'userPhoto' | 'tweetPhoto') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setState(prev => ({ ...prev, [key]: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (key: string, value: any) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

  const handleTimeChange = (type: 'hour' | 'minute' | 'period', value: string) => {
    setState(prev => ({
      ...prev,
      time: { ...prev.time, [type]: value }
    }))
  }

  const exportTweet = async (format: 'png' | 'jpg') => {
    if (exportRef.current === null) {
      return
    }

    try {
      const dataUrl = await toPng(exportRef.current, { quality: 1.0, pixelRatio: 3 })
      const link = document.createElement('a')
      link.download = `tweet.${format}`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Error exporting tweet:', err)
    }
  }

  const formattedTime = `${state.time.hour}:${state.time.minute} ${state.time.period}`

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">

              <span className="ml-2 text-2xl font-bold text-purple-600">Fake Tweet</span>
            </div>
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">Back to Home</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Create Your <span className="text-purple-500">Tweet</span>
          </h1>

          <Tabs value={state.activeTab} onValueChange={(value) => handleInputChange('activeTab', value)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit Tweet ✨</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              {/* Export wrapper with background */}
              <div
                ref={exportRef}
                className="rounded-xl p-4 sm:p-8 md:p-16"
                style={{
                  background: state.showBackground ? state.backgroundColor : 'transparent',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}
              >
                {/* Tweet card */}
                <Card className={`${state.isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-xl`}>
                  <CardContent className="p-4 sm:p-6">
                    <div ref={tweetRef} className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                          <AvatarImage src={state.userPhoto} alt="User avatar" />
                          <AvatarFallback>{state.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {state.activeTab === "edit" && (
                          <Label htmlFor="user-photo" className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer">
                            <Input id="user-photo" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'userPhoto')} className="hidden" />
                            <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="sr-only">Upload user photo</span>
                          </Label>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        {state.activeTab === "edit" ? (
                          <div className="space-y-2">
                            <Input
                              value={state.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="font-bold"
                              placeholder="Your name"
                            />
                            <div className="flex items-center space-x-2">
                              <Input
                                value={state.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                className="text-gray-500"
                                placeholder="Your username"
                              />
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={state.isVerified}
                                  onCheckedChange={(checked) => handleInputChange('isVerified', checked)}
                                  id="verified"
                                />
                                <Label htmlFor="verified">Verified</Label>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <span className="font-bold">{state.name || 'Your Name'}</span>
                            {state.isVerified && <BadgeCheck className="inline w-4 h-4 text-blue-500 ml-1" />}
                            <div className="text-gray-500">@{state.username || 'username'}</div>
                          </div>
                        )}

                        {state.activeTab === "edit" ? (
                          <textarea
                            className="w-full mt-2 bg-transparent resize-none focus:outline-none"
                            value={state.tweetText}
                            onChange={(e) => handleInputChange('tweetText', e.target.value)}
                            rows={3}
                            placeholder="What's happening?"
                          />
                        ) : (
                          <p className="mt-2 break-words">{state.tweetText || "What's happening?"}</p>
                        )}

                        <div className="mt-3 rounded-xl overflow-hidden relative aspect-video">
                          {state.tweetPhoto ? (
                            <Image
                              src={state.tweetPhoto}
                              alt="Tweet image"
                              layout="fill"
                              objectFit="cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-gray-400">No image uploaded</span>
                            </div>
                          )}
                          {state.activeTab === "edit" && (
                            <Label htmlFor="tweet-photo" className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 cursor-pointer">
                              <Input id="tweet-photo" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'tweetPhoto')} className="hidden" />
                              <Upload className="w-4 h-4" />
                              <span className="sr-only">Upload tweet photo</span>
                            </Label>
                          )}
                        </div>

                        {state.activeTab === "edit" ? (
                          <div className="mt-2 space-y-2">
                            <div className="flex space-x-2">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {state.date ? format(state.date, "PPP") : <span>Pick a date</span>}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={state.date}
                                    onSelect={(date) => handleInputChange('date', date)}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div className="flex space-x-2">
                              <Select value={state.time.hour} onValueChange={(value) => handleTimeChange('hour', value)}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Hour" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                                    <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                                      {hour.toString().padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={state.time.minute} onValueChange={(value) => handleTimeChange('minute', value)}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Minute" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                                    <SelectItem key={minute} value={minute.toString().padStart(2, '0')}>
                                      {minute.toString().padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Select value={state.time.period} onValueChange={(value) => handleTimeChange('period', value)}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="AM/PM" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="AM">AM</SelectItem>
                                  <SelectItem value="PM">PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Input
                              type="number"
                              value={state.views}
                              onChange={(e) => handleInputChange('views', e.target.value)}
                              className="w-full"
                              placeholder="Number of views"
                            />
                          </div>
                        ) : (
                          <div className="mt-2 text-sm text-gray-500">
                            {formattedTime} · {state.date ? format(state.date, "MMM d, yyyy") : 'Jan 1, 2024'} · {formatNumber(state.views)} Views
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4 text-gray-500">
                          {['replies', 'retweets', 'likes', 'bookmarks'].map((stat) => (
                            <div key={stat} className="flex items-center space-x-1">
                              {stat === "replies" && <MessageCircle className="w-4 h-4" />}
                              {stat === "retweets" && <Repeat2 className="w-4 h-4" />}
                              {stat === "likes" && <Heart className="w-4 h-4" />}
                              {stat === "bookmarks" && <Bookmark className="w-4 h-4" />}
                              {state.activeTab === "edit" ? (
                                <Input
                                  type="number"
                                  value={
                                    typeof state[stat as keyof typeof state] === 'number' || typeof state[stat as keyof typeof state] === 'string'
                                      ? state[stat as keyof typeof state]
                                      : 0 // لو كانت القيمة مش رقمية أو نصية، هنحط 0
                                  }
                                  onChange={(e) => handleInputChange(stat, e.target.value)}
                                  className="w-12 sm:w-16 text-center"
                                  placeholder="0"
                                />
                              ) : (
                                <span>{formatNumber(Number(state[stat as keyof typeof state]))}</span> // نستخدم `Number` هنا عشان نضمن إن القيمة هتكون رقم
                              )}

                            </div>
                          ))}
                          <Upload className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {state.activeTab === "preview" && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ background: state.backgroundColor }}
                          />
                          <span>Background</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64">
                        <div className="grid gap-2">
                          <Label>Presets</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {backgroundPresets.map((preset) => (
                              <Button
                                key={preset.name}
                                variant="outline"
                                className="h-12 w-full"
                                style={{ background: preset.value }}
                                onClick={() => handleInputChange('backgroundColor', preset.value)}
                              >
                                <span className="sr-only">{preset.name}</span>
                              </Button>
                            ))}
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Switch
                              id="show-background"
                              checked={state.showBackground}
                              onCheckedChange={(checked) => handleInputChange('showBackground', checked)}
                            />
                            <Label htmlFor="show-background">Show background</Label>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dark-mode"
                        checked={state.isDarkMode}
                        onCheckedChange={(checked) => handleInputChange('isDarkMode', checked)}
                      />
                      <Label htmlFor="dark-mode">Dark mode</Label>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Export
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => exportTweet('png')}>Save PNG</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => exportTweet('jpg')}>Save JPG</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 <a href="https://mohamedkhire.vercel.app/">Mohamed Khire.</a>  All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}