import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { testimonials } from "@/lib/data"

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const next = () => {
      setCurrentIndex((currentIndex + 1) % testimonials.length)
    }
  
    const previous = () => {
      setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length)
    }
  return (
    <section className="py-24 bg-gray-50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 mt[-900px]">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Témoignages</h2>
          <p className="text-gray-500 md:text-lg max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de leur expérience avec nous
          </p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <Card className="bg-white">
            <CardContent className="pt-12">
              <Quote className="w-12 h-12 text-primary mx-auto mb-8" />
              <blockquote className="text-center space-y-4">
                <p className="text-xl italic">{testimonials[currentIndex].quote}</p>
                <footer>
                  <p className="font-semibold">{testimonials[currentIndex].author}</p>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                </footer>
              </blockquote>
            </CardContent>
          </Card>
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={previous}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials