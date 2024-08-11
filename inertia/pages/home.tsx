import { Head } from '@inertiajs/react'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />

      <div className="container">
        <div className="title">ITBunnies best team</div>

        <img
          src="https://storage.googleapis.com/public_bucket-1231/photo_2023-12-11_15-13-05.jpg"
          alt=""
        />
      </div>
    </>
  )
}
