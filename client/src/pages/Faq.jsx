import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Footer from '../components/Footer'

const Faq = () => {

  const faqs = [
    {
      question: "What is Swishsesh?",
      answer: "Swishsesh is a platform built to empower and educate athletes. We host weekly pickup runs, competitive events and training sessions to foster an inclusive, basketball community where athletes can develop and showcase their talents.",
    },
    {
      question: "How do I sign up for a run?",
      answer:
        "Sign up using our app! Register by selecting which date, time and location you would like to run.",
    },
    {
      question: "How much are runs?",
      answer:
        "$10.",
    },
    {
      question: "Are you planning on expanding on locations outside of Doraville, GA?",
      answer:
        "Yes! If you are interested in hosting a run, please reach out to us at swishsesh@gmail.com.",
    },

  ]

  return (
    <>
      <div>
        <div className="bg-slate-900 lg:mt-24 mt-24">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-slate-100">
                Frequently asked questions
              </h2>
              <dl className="mt-10 space-y-6 divide-y divide-gray-100/10">
                {faqs.map((faq) => (
                  <Disclosure as="div" key={faq.question} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-slate-100">
                            <span className="text-base font-semibold leading-7">
                              {faq.question}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <PlusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <MinusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <p className="text-base leading-7 text-slate-300">
                            {faq.answer}
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
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

export default Faq




