import Footer from "../components/Footer"

const About = () => {
  const stats = [
    { id: 1, name: 'yay', value: '8,000+' },
    { id: 2, name: 'Flat platform fee', value: '3%' },
    { id: 3, name: 'Uptime guarantee', value: '99.9%' },
    { id: 4, name: 'Paid out to creators', value: '$70M' },
  ]

  return (
    <>
      <div className="relative bg-slate-900 lg:mt-24 mt-36">
        <img
          className="h-56 w-full bg-gray-50 object-cover lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-1/2"
          src="https://i.imgur.com/q6HKElg.jpg"
          alt=""
        />
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="px-6 pt-16 pb-24 sm:pt-20 sm:pb-32 lg:col-start-2 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-2xl lg:mr-0 lg:max-w-lg">
              <h2 className="text-base font-semibold leading-8 text-indigo-500">
                Our Mission
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                Celebrate ATL's local hoops
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Swishsesh is a platform built to educate and empower athletes.
              </p>
              <dl className="mt-16 grid max-w-xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 xl:mt-16">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="flex flex-col gap-y-3 border-l border-gray-900/10 pl-6"
                  >
                    <dt className="text-sm leading-6 text-slate-200">
                      {stat.name}
                    </dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-slate-100">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  )
}


export default About
