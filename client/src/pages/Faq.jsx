import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const Faq = () => {

  const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
]

  return (
    <div>
      <h1>FAQ</h1>

      <h3>
        {" "}
        Where Do I Sign Up
        <p>
          Players will be able to participate in a SwishSesh session once they
          have signed in their accounts using Google authentication.{" "}
        </p>
      </h3>

      <h3>
        {" "}
        How Do I Secure A Spot
        <p>
          Once you have signed up and are a member of SwishSesh, you will be
          able to pay online to secure a spot for a given day
        </p>
      </h3>

      <h3>
        {" "}
        How Many People Can Play Per Day
        <p>The total amount of players within a session will be 30.</p>
      </h3>

      <h3>
        {" "}
        Rules
        <p>
          First 20 to get to the gym will play the first games. First game to
          15, every other game to 12. 1's and 2's, straight up. If you win, your
          team advances to Winner's Court. If you lose, shoot or remaining spots
          on the respawn Court. If you sat out one game, you get on next game
          automatically on the Respawn Court.
        </p>
      </h3>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
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
                        <p className="text-base leading-7 text-gray-600">
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
  )
}

export default Faq
