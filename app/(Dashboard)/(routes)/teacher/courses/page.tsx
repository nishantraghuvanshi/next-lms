import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'

const CoursePage = () => {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button>Create Course</Button>
      </Link>
    </div>
  );
}

export default CoursePage