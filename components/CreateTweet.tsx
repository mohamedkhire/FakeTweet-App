'use client'

import React, { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { MessageCircle, Repeat2, Heart, Bookmark, Upload, ChevronDown, CalendarIcon, ArrowLeft, Moon, Sun, Camera, ImagePlus, BarChart2, X } from "lucide-react"
import Image from "next/image"
import { toPng } from 'html-to-image'
import { format } from "date-fns"
import Link from 'next/link'
import Head from 'next/head'

const VerificationBadge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 22 22" aria-label="Verified account" role="img">
    <g>
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
        fill="currentColor"
      />
    </g>
  </svg>
)

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
  verificationStatus: "none",
  userPhoto: "",
  tweetPhoto: "",
  date: new Date(),
  time: { hour: "12", minute: "00", period: "AM" },
  views: 0,
  replies: 0,
  retweets: 0,
  likes: 0,
  bookmarks: 0,
  isDarkMode: false,
  backgroundColor: "linear-gradient(to bottom right, #111827, #1F2937)",
  backgroundType: "preset",
  solidColor: "#4F46E5",
  gradientColor1: "#4F46E5",
  gradientColor2: "#7C3AED",
  gradientDirection: "to bottom right",
  backgroundOpacity: 1,
  backgroundBlur: 0,
  showBackground: true,
}

const backgroundPresets = [
  { name: "Dark", value: "linear-gradient(to bottom, #111827, #1F2937)" },
  { name: "Purple", value: "linear-gradient(to bottom right, #4F46E5, #7C3AED)" },
  { name: "Blue", value: "linear-gradient(to bottom right, #2563EB, #3B82F6)" },
  { name: "Light", value: "linear-gradient(to bottom, #F3F4F6, #E5E7EB)" },
]

export default function TweetCreator() {
  const [state, setState] = useState(initialState)
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

  const handleDateTimeChange = (date: Date) => {
    const hours = date.getHours()
    const period = hours >= 12 ? 'PM' : 'AM'
    const hour = hours % 12 || 12
    setState(prev => ({
      ...prev,
      date,
      time: {
        hour: hour.toString().padStart(2, '0'),
        minute: date.getMinutes().toString().padStart(2, '0'),
        period
      }
    }))
  }

  const handleBackgroundChange = (key: string, value: any) => {
    setState(prev => {
      const newState = { ...prev, [key]: value }
      let backgroundColor = prev.backgroundColor

      if (key === 'backgroundType') {
        switch (value) {
          case 'preset':
            backgroundColor = backgroundPresets[0].value
            break
          case 'solid':
            backgroundColor = newState.solidColor
            break
          case 'gradient':
            backgroundColor = `linear-gradient(${newState.gradientDirection}, ${newState.gradientColor1}, ${newState.gradientColor2})`
            break
        }
      } else if (key === 'backgroundColor') {
        backgroundColor = value
      } else if (newState.backgroundType === 'solid') {
        backgroundColor = newState.solidColor
      } else if (newState.backgroundType === 'gradient') {
        backgroundColor = `linear-gradient(${newState.gradientDirection}, ${newState.gradientColor1}, ${newState.gradientColor2})`
      }

      return { ...newState, backgroundColor }
    })
  }

  const getBackgroundStyle = () => {
    let style: React.CSSProperties = {
      background: state.backgroundColor,
    }

    if (state.backgroundOpacity < 1) {
      style.opacity = state.backgroundOpacity
    }

    if (state.backgroundBlur > 0) {
      style.filter = `blur(${state.backgroundBlur}px)`
    }

    return style
  }

  const exportTweet = async (format: 'png' | 'jpg') => {
    if (exportRef.current === null) {
      return
    }

    try {
      const dataUrl = await toPng(exportRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        style: {
          padding: '2rem',
          borderRadius: '0.75rem',
        }
      })
      const link = document.createElement('a')
      link.download = `tweet.${format}`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Error exporting tweet:', err)
    }
  }

  const formattedDateTime = state.date ? format(state.date, "MMM d, yyyy 'at' h:mm a") : 'Date and time not set'

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

      <div className={`min-h-screen flex flex-col`}>
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
                      <div className="rounded-full bg-dark-100 p-2">
                        <MessageCircle className="h-5 w-5 text-dark-600" />
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

        <main className="flex-grow bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              Create Your <span className="text-primary">Tweet</span>
            </h1>

            <Tabs value={state.activeTab} onValueChange={(value) => handleInputChange('activeTab', value)} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit Tweet ✨</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <div
                  ref={exportRef}
                  className="rounded-xl p-4 sm:p-8 md:p-16 relative overflow-hidden"
                  style={{
                    maxWidth: '600px',
                    margin: '0 auto'
                  }}
                >
                  {state.showBackground && (
                    <div className="absolute inset-0" style={getBackgroundStyle()} />
                  )}
                  <Card className={`shadow-xl relative z-10 ${state.isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <Label htmlFor="user-photo" className="cursor-pointer">
                              <Avatar className="w-12 h-12 hover:opacity-80 transition-opacity">
                                {state.userPhoto ? (
                                  <AvatarImage src={state.userPhoto} alt="User avatar" />
                                ) : (
                                  <AvatarFallback className="bg-muted flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-muted-foreground" />
                                  </AvatarFallback>
                                )}
                              </Avatar>
                              <Input id="user-photo" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'userPhoto')} className="hidden" />
                            </Label>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            {state.activeTab === "edit" ? (
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Input
                                    value={state.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="font-bold text-lg"
                                    placeholder="Your name"
                                  />
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <VerificationBadge className={`h-5 w-5 ${state.verificationStatus === 'none' ? 'text-muted-foreground' :
                                            state.verificationStatus === 'blue' ? 'text-blue-500' :
                                              'text-yellow-500'
                                          }`} />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40">
                                      <div className="grid gap-2">
                                        <Button variant="ghost" className="justify-start" onClick={() => handleInputChange('verificationStatus', 'none')}>
                                          <VerificationBadge className="h-4 w-4 text-muted-foreground mr-2" /> No Tick
                                        </Button>
                                        <Button variant="ghost" className="justify-start" onClick={() => handleInputChange('verificationStatus', 'blue')}>
                                          <VerificationBadge className="h-4 w-4 text-blue-500 mr-2" /> Blue Tick
                                        </Button>
                                        <Button variant="ghost" className="justify-start" onClick={() => handleInputChange('verificationStatus', 'gold')}>
                                          <VerificationBadge className="h-4 w-4 text-yellow-500 mr-2" /> Gold Tick
                                        </Button>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <Input
                                  value={state.username}
                                  onChange={(e) => handleInputChange('username', e.target.value)}
                                  className="text-muted-foreground"
                                  placeholder="Your username"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col">
                                <div className="flex items-center space-x-1">
                                  <span className="font-bold text-lg">{state.name || "Your name"}</span>
                                  {state.verificationStatus !== 'none' && (
                                    <VerificationBadge className={`h-5 w-5 ${state.verificationStatus === 'blue' ? 'text-blue-500' : 'text-yellow-500'}`} />
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground">@{state.username || 'username'}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-2">
                            {state.activeTab === "edit" ? (
                              <Textarea
                                className="w-full mt-2 bg-transparent resize-none focus:outline-none overflow-hidden"
                                value={state.tweetText}
                                onChange={(e) => {
                                  handleInputChange('tweetText', e.target.value);
                                  e.target.style.height = 'auto';
                                  e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                                rows={3}
                                placeholder="What's happening?"
                              />
                            ) : (
                              <p className="mt-2 break-words">{state.tweetText || "What's happening?"}</p>
                            )}
                          </div>

                          <div className="mt-3 rounded-xl overflow-hidden relative">
                            {state.tweetPhoto ? (
                              <div className="relative">
                                <Image
                                  src={state.tweetPhoto}
                                  alt="Tweet image"
                                  width={500}
                                  height={300}
                                  layout="responsive"
                                  objectFit="cover"
                                />
                                {state.activeTab === "edit" && (
                                  <Button
                                    variant="secondary"
                                    size="icon"
                                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                                    onClick={() => handleInputChange('tweetPhoto', '')}
                                  >
                                    <X className="h-4 w-4 text-white" />
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <div className="w-full h-48 bg-muted flex items-center justify-center">
                                {state.activeTab === "edit" ? (
                                  <Label htmlFor="tweet-photo" className="cursor-pointer flex flex-col items-center">
                                    <ImagePlus className="w-12 h-12 text-muted-foreground mb-2" />
                                    <span className="text-muted-foreground">Click to upload an image</span>
                                    <Input id="tweet-photo" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'tweetPhoto')} className="hidden" />
                                  </Label>
                                ) : (
                                  <span className="text-muted-foreground">No image uploaded</span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="mt-4 flex items-center justify-between text-muted-foreground text-sm">
                            <div className="flex items-center space-x-4">
                              {state.activeTab === "edit" ? (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="text-xs">
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {formattedDateTime}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={state.date}
                                      onSelect={(date) => {
                                        if (date) {
                                          const newDate = new Date(date)
                                          newDate.setHours(parseInt(state.time.hour))
                                          newDate.setMinutes(parseInt(state.time.minute))
                                          handleDateTimeChange(newDate)
                                        }
                                      }}
                                      initialFocus
                                    />
                                    <div className="border-t p-3 flex justify-between">
                                      <Select
                                        value={state.time.hour}
                                        onValueChange={(value) => {
                                          const newDate = new Date(state.date)
                                          newDate.setHours(parseInt(value))
                                          handleDateTimeChange(newDate)
                                        }}
                                      >
                                        <SelectTrigger className="w-[70px]">
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
                                      <Select
                                        value={state.time.minute}
                                        onValueChange={(value) => {
                                          const newDate = new Date(state.date)
                                          newDate.setMinutes(parseInt(value))
                                          handleDateTimeChange(newDate)
                                        }}
                                      >
                                        <SelectTrigger className="w-[70px]">
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
                                      <Select
                                        value={state.time.period}
                                        onValueChange={(value) => {
                                          const newDate = new Date(state.date)
                                          const currentHours = newDate.getHours()
                                          const newHours = value === 'PM' ? (currentHours % 12) + 12 : currentHours % 12
                                          newDate.setHours(newHours)
                                          handleDateTimeChange(newDate)
                                        }}
                                      >
                                        <SelectTrigger className="w-[70px]">
                                          <SelectValue placeholder="AM/PM" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="AM">AM</SelectItem>
                                          <SelectItem value="PM">PM</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              ) : (
                                <div className="text-xs">
                                  <CalendarIcon className="inline-block mr-2 h-4 w-4" />
                                  {formattedDateTime}
                                </div>
                              )}
                              {state.activeTab === "edit" ? (
                                <div className="flex items-center space-x-2">
                                  <Input
                                    type="number"
                                    value={state.views}
                                    onChange={(e) => handleInputChange('views', parseInt(e.target.value) || 0)}
                                    className="w-20 text-center"
                                  />
                                  <span>Views</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-1">
                                  <BarChart2 className="w-4 h-4" />
                                  <span>{formatNumber(state.views)} Views</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 flex justify-between items-center text-muted-foreground">
                            {['replies', 'retweets', 'likes', 'bookmarks'].map((stat) => (
                              <div key={stat} className="flex items-center space-x-1">
                                {stat === "replies" && <MessageCircle className="w-4 h-4" />}
                                {stat === "retweets" && <Repeat2 className="w-4 h-4" />}
                                {stat === "likes" && <Heart className="w-4 h-4" />}
                                {stat === "bookmarks" && <Bookmark className="w-4 h-4" />}
                                {state.activeTab === "edit" ? (
                                  <Input
                                    type="number"
                                    value={state[stat as keyof typeof state] as number}
                                    onChange={(e) => handleInputChange(stat, parseInt(e.target.value) || 0)}
                                    className="w-16 text-center"
                                    placeholder={`${stat.charAt(0).toUpperCase() + stat.slice(1)}`}
                                  />
                                ) : (
                                  <span>{formatNumber(state[stat as keyof typeof state] as number)}</span>
                                )}
                              </div>
                            ))}
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
                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Background Type</h4>
                              <Select
                                value={state.backgroundType}
                                onValueChange={(value) => handleBackgroundChange('backgroundType', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select background type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="preset">Preset</SelectItem>
                                  <SelectItem value="solid">Solid Color</SelectItem>
                                  <SelectItem value="gradient">Gradient</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {state.backgroundType === 'preset' && (
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">Presets</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {backgroundPresets.map((preset) => (
                                    <Button
                                      key={preset.name}
                                      variant="outline"
                                      className="h-12 w-full"
                                      style={{ background: preset.value }}
                                      onClick={() => handleBackgroundChange('backgroundColor', preset.value)}
                                    >
                                      <span className="sr-only">{preset.name}</span>
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {state.backgroundType === 'solid' && (
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">Solid Color</h4>
                                <div className="flex items-center space-x-2">
                                  <Input
                                    type="color"
                                    value={state.solidColor}
                                    onChange={(e) => handleBackgroundChange('solidColor', e.target.value)}
                                    className="w-10 h-10 p-0 border-none"
                                  />
                                  <Input
                                    type="text"
                                    value={state.solidColor}
                                    onChange={(e) => handleBackgroundChange('solidColor', e.target.value)}
                                    className="flex-grow"
                                    placeholder="#000000"
                                  />
                                </div>
                              </div>
                            )}

                            {state.backgroundType === 'gradient' && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium leading-none">Gradient Color 1</h4>
                                  <div className="flex items-center space-x-2">
                                    <Input
                                      type="color"
                                      value={state.gradientColor1}
                                      onChange={(e) => handleBackgroundChange('gradientColor1', e.target.value)}
                                      className="w-10 h-10 p-0 border-none"
                                    />
                                    <Input
                                      type="text"
                                      value={state.gradientColor1}
                                      onChange={(e) => handleBackgroundChange('gradientColor1', e.target.value)}
                                      className="flex-grow"
                                      placeholder="#000000"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-medium leading-none">Gradient Color 2</h4>
                                  <div className="flex items-center space-x-2">
                                    <Input
                                      type="color"
                                      value={state.gradientColor2}
                                      onChange={(e) => handleBackgroundChange('gradientColor2', e.target.value)}
                                      className="w-10 h-10 p-0 border-none"
                                    />
                                    <Input
                                      type="text"
                                      value={state.gradientColor2}
                                      onChange={(e) => handleBackgroundChange('gradientColor2', e.target.value)}
                                      className="flex-grow"
                                      placeholder="#000000"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-medium leading-none">Gradient Direction</h4>
                                  <Select
                                    value={state.gradientDirection}
                                    onValueChange={(value) => handleBackgroundChange('gradientDirection', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select direction" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="to right">Horizontal</SelectItem>
                                      <SelectItem value="to bottom">Vertical</SelectItem>
                                      <SelectItem value="to bottom right">Diagonal</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}

                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Opacity</h4>
                              <Slider
                                value={[state.backgroundOpacity]}
                                min={0}
                                max={1}
                                step={0.01}
                                onValueChange={([value]) => handleBackgroundChange('backgroundOpacity', value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">Blur</h4>
                              <Slider
                                value={[state.backgroundBlur]}
                                min={0}
                                max={20}
                                step={1}
                                onValueChange={([value]) => handleBackgroundChange('backgroundBlur', value)}
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="show-background"
                                checked={state.showBackground}
                                onCheckedChange={(checked) => handleBackgroundChange('showBackground', checked)}
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

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          Export as
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-2 w-auto" align="end" side="top">
                        <div className="flex flex-col">
                          <button className="text-left p-2" onClick={() => exportTweet('png')}>
                            PNG
                          </button>
                          <button className="text-left p-2" onClick={() => exportTweet('jpg')}>
                            JPG
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
        </main>
        <footer className="bg-background border-t">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-muted-foreground text-sm">
              © 2024 <a href="https://mohamedkhire.vercel.app/" className="hover:underline">Mohamed Khire</a>. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}