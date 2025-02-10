<template>
  <section class="w-full relative py-8 md:py-12 px-2 md:px-12">
    <!-- Compact header for mobile -->
    <div class="container mx-auto text-center space-y-2 mb-4 md:mb-16">
      <Badge variant="secondary" class="mb-2 md:mb-4">
        Smart Booking Assistant
      </Badge>
      <h2 class="text-xl md:text-4xl font-bold tracking-tighter text-foreground">
        What Our Users Say About JustBookMe
      </h2>
      <p class="text-sm md:text-lg text-muted-foreground mx-auto max-w-[700px]">
        See how businesses are transforming their booking experience with our AI assistant.
      </p>
    </div>

    <!-- First row of reviews (existing) -->
    <div class="container mx-auto mt-2 md:mt-10 overflow-hidden">
      <div class="sliding-reviews sliding-right px-2 md:px-12">
        <!-- Original and duplicate sets -->
        <template v-for="prefix in ['original', 'duplicate']">
          <Card
            v-for="(review, index) in reviews" 
            :key="`${prefix}-${index}`" 
            class="review-card group hover:border-primary/20 backdrop-blur-sm bg-card/60"
          >
            <CardHeader class="flex-row items-center gap-2 md:gap-4 space-y-0 p-2 md:p-4">
              <Avatar class="h-8 w-8 md:h-10 md:w-10">
                <AvatarImage 
                  :src="getAvatarUrl(review.email)" 
                  :alt="review.name"
                  class="object-cover"
                />
                <AvatarFallback :class="review.avatarClass">
                  <UserIcon class="h-4 w-4 md:h-5 md:w-5" />
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col">
                <p class="text-sm md:text-base font-semibold leading-none tracking-tight">{{ review.name }}</p>
                <p class="text-xs md:text-sm text-muted-foreground">{{ review.role }}</p>
              </div>
              <div class="ml-auto">
                <Badge variant="outline" class="bg-primary/5 text-xs">
                  {{ review.year }}
                </Badge>
              </div>
            </CardHeader>
            <CardContent class="p-2 md:p-4 -mt-2">
              <blockquote>
                <p class="text-xs md:text-sm leading-relaxed">{{ review.text }}</p>
              </blockquote>
            </CardContent>
          </Card>
        </template>
      </div>
    </div>

    <!-- New row of reviews moving left -->
    <div class="container mx-auto mt-4 overflow-hidden">
      <div class="sliding-reviews sliding-left px-2 md:px-12">
        <!-- Original and duplicate sets -->
        <template v-for="prefix in ['original', 'duplicate']">
          <Card
            v-for="(review, index) in alternateReviews" 
            :key="`${prefix}-${index}`" 
            class="review-card group hover:border-primary/20 backdrop-blur-sm bg-card/60"
          >
            <CardHeader class="flex-row items-center gap-2 md:gap-4 space-y-0 p-2 md:p-4">
              <Avatar class="h-8 w-8 md:h-10 md:w-10">
                <AvatarImage 
                  :src="getAvatarUrl(review.email)" 
                  :alt="review.name"
                  class="object-cover"
                />
                <AvatarFallback :class="review.avatarClass">
                  <UserIcon class="h-4 w-4 md:h-5 md:w-5" />
                </AvatarFallback>
              </Avatar>
              <div class="flex flex-col">
                <p class="text-sm md:text-base font-semibold leading-none tracking-tight">{{ review.name }}</p>
                <p class="text-xs md:text-sm text-muted-foreground">{{ review.role }}</p>
              </div>
              <div class="ml-auto">
                <Badge variant="outline" class="bg-primary/5 text-xs">
                  {{ review.year }}
                </Badge>
              </div>
            </CardHeader>
            <CardContent class="p-2 md:p-4 -mt-2">
              <blockquote>
                <p class="text-xs md:text-sm leading-relaxed">{{ review.text }}</p>
              </blockquote>
            </CardContent>
          </Card>
        </template>
      </div>
    </div>

    <!-- Compact disclaimer -->
    <div class="container mx-auto px-2 md:px-4">
      <p class="text-[10px] md:text-xs text-center text-muted-foreground mt-4 md:mt-8">
        * Reviews from verified JustBookMe customers. Results may vary based on business type and implementation.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { UserIcon } from 'lucide-vue-next'

const reviews = [
  {
    text: "JustBookMe has revolutionized our appointment system. The chatbot handles scheduling perfectly, and our no-show rate has dropped by 40% thanks to the smart reminders!",
    name: "Sarah Chen",
    role: "Dental Clinic Manager",
    email: "sarah@dentalcare.com",
    avatarClass: "bg-gradient-to-br from-violet-500 to-purple-700 text-white",
    year: "2024"
  },
  {
    text: "The AI assistant feels incredibly natural in conversations. Our clients love how easy it is to book appointments 24/7, and we love how it's boosted our booking efficiency.",
    name: "Michael Rodriguez",
    role: "Spa Owner",
    email: "michael@wellnessspa.com",
    avatarClass: "bg-gradient-to-br from-blue-500 to-cyan-600 text-white",
    year: "2024"
  },
  {
    text: "Integration was seamless! The chatbot handles customer queries brilliantly, and the automated reminders have made our scheduling process completely hands-free.",
    name: "Emma Thompson",
    role: "Business Consultant",
    email: "emma@consulting.co",
    avatarClass: "bg-gradient-to-br from-emerald-500 to-teal-700 text-white",
    year: "2024"
  },
  {
    text: "JustBookMe has become our virtual receptionist. It manages appointments, answers queries, and follows up with clients - all while maintaining a personal touch!",
    name: "David Park",
    role: "Fitness Studio Director",
    email: "david@fitlife.com",
    avatarClass: "bg-gradient-to-br from-rose-500 to-pink-700 text-white",
    year: "2024"
  }
]

const alternateReviews = [
  {
    text: "The automated reminder system is a game-changer. Our appointment attendance rate has improved significantly since implementing JustBookMe.",
    name: "Lisa Wang",
    role: "Beauty Salon Owner",
    email: "lisa@beautysalon.com",
    avatarClass: "bg-gradient-to-br from-orange-500 to-red-700 text-white",
    year: "2024"
  },
  {
    text: "Our patients appreciate the 24/7 booking capability, and we love how the AI handles appointment rescheduling automatically.",
    name: "James Wilson",
    role: "Medical Practice Manager",
    email: "james@medcenter.com",
    avatarClass: "bg-gradient-to-br from-green-500 to-emerald-700 text-white",
    year: "2024"
  },
  {
    text: "The chatbot's ability to handle complex scheduling requirements while maintaining a friendly tone is impressive. It's like having an extra team member!",
    name: "Ana Martinez",
    role: "Restaurant Manager",
    email: "ana@dining.com",
    avatarClass: "bg-gradient-to-br from-pink-500 to-purple-700 text-white",
    year: "2024"
  },
  {
    text: "Integration with our existing systems was smooth, and the customer support team was incredibly helpful throughout the process.",
    name: "Tom Bradley",
    role: "IT Consultant",
    email: "tom@techsolutions.com",
    avatarClass: "bg-gradient-to-br from-blue-500 to-indigo-700 text-white",
    year: "2024"
  }
]

const getAvatarUrl = (email) => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
}
</script>

<style scoped>
.sliding-reviews {
  @apply flex gap-2 md:gap-5;
  animation: slide 25s linear infinite;
  width: max-content;
  padding: 0.25rem 0;
}

.review-card {
  @apply w-[280px] md:w-[400px] flex-shrink-0 transition-all duration-300 
         border-border/50;
  height: fit-content; /* Allows card to shrink to content */
}

/* Desktop animation */
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 2.5rem)); /* Adjusted for desktop gap */
  }
}

/* Mobile-specific styles */
@media (max-width: 767px) {
  .review-card {
    @apply w-[240px];
  }

  .sliding-reviews {
    animation: slideSmall 20s linear infinite;
  }

  /* Separate mobile animation */
  @keyframes slideSmall {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 0.5rem));
    }
  }
}

.avatar-fallback {
  @apply flex items-center justify-center;
}

/* Add subtle animation for avatar hover */
.group:hover .avatar-fallback {
  @apply scale-105 transition-transform duration-300;
}

/* Adjust animation speed for mobile */
.sliding-reviews {
  @apply flex gap-3 md:gap-5;
  animation: slide 25s linear infinite;
  width: max-content;
  padding: 0.5rem 0;
}

/* Adjust card header for mobile */
:deep(.card-header) {
  @apply p-2 md:p-4;
}

/* Adjust card content padding for mobile */
:deep(.card-content) {
  @apply p-2 md:p-4;
}

/* Adjust avatar size for mobile */
:deep(.avatar) {
  @apply h-8 w-8 md:h-10 md:w-10;
}

/* Mobile-specific animation */
@media (max-width: 768px) {
  @keyframes slide {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
}

/* Update existing sliding animation class name */
.sliding-right {
  animation: slideRight 25s linear infinite;
}

/* Add new sliding animation for opposite direction */
.sliding-left {
  animation: slideLeft 25s linear infinite;
}

/* Update existing slide animation name */
@keyframes slideRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 2.5rem));
  }
}

/* Add new animation for opposite direction */
@keyframes slideLeft {
  0% {
    transform: translateX(calc(-50% - 2.5rem));
  }
  100% {
    transform: translateX(0);
  }
}

/* Update mobile animations */
@media (max-width: 767px) {
  .sliding-right {
    animation: slideRightSmall 20s linear infinite;
  }

  .sliding-left {
    animation: slideLeftSmall 20s linear infinite;
  }

  @keyframes slideRightSmall {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 0.5rem));
    }
  }

  @keyframes slideLeftSmall {
    0% {
      transform: translateX(calc(-50% - 0.5rem));
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
  