// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App'
import HouseContextProvider from '../src/components/HouseContext'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ok:true,json:async()=>({ready:false})}))
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })
function mount(path='/') {
  return render(<HouseContextProvider><MemoryRouter initialEntries={[path]}><App /></MemoryRouter></HouseContextProvider>)
}
describe('Visitor flows', () => {
  it('switches between buying and renting and resets incompatible prices', async () => {
    const user = userEvent.setup()
    mount()
    expect(screen.getAllByRole('article')).toHaveLength(10)
    await user.selectOptions(screen.getByLabelText('Price range · USD'), '300000-plus')
    await user.click(screen.getByRole('button',{name:'Search homes'}))
    expect(screen.getByText('No homes match these filters')).toBeInTheDocument()
    await user.click(screen.getByRole('radio',{name:'Rent a home'}))
    expect(screen.getAllByRole('article')).toHaveLength(8)
    expect(screen.getByLabelText('Monthly rent · USD')).toHaveValue('')
  })
  it('keeps all filter choices after empty results and clears filters', async () => {
    const user = userEvent.setup()
    mount()
    await user.selectOptions(screen.getByLabelText('Location'), 'United States')
    await user.selectOptions(screen.getByLabelText('Price range · USD'), '300000-plus')
    await user.click(screen.getByRole('button',{name:'Search homes'}))
    expect(within(screen.getByLabelText('Location')).getByRole('option',{name:'Canada'})).toBeInTheDocument()
    await user.click(screen.getByRole('button',{name:'Show all properties'}))
    expect(screen.getAllByRole('article')).toHaveLength(10)
    expect(screen.getByLabelText('Location')).toHaveValue('')
  })
  it('opens a property and its agent listings, then returns home', async () => {
    const user = userEvent.setup()
    mount()
    await user.click(within(screen.getAllByRole('article')[0]).getByRole('link'))
    expect(screen.getByRole('heading',{name:'About this property'})).toBeInTheDocument()
    await user.click(screen.getByRole('link',{name:'View agent listings →'}))
    expect(screen.getByRole('heading',{name:'Patricia Tullert'})).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(2)
    await user.click(screen.getByRole('link',{name:'← All properties'}))
    expect(screen.getByRole('heading',{name:'Explore our properties'})).toBeInTheDocument()
  })
  it.each(['/property/999','/property/1abc'])('handles invalid property route %s', (path) => {
    mount(path)
    expect(screen.getByRole('heading',{name:'Property not found'})).toBeInTheDocument()
  })
  it.each(['/does-not-exist','/agents/missing'])('handles missing route %s', (path) => {
    mount(path)
    expect(screen.getByRole('heading',{name:'Page not found'})).toBeInTheDocument()
  })
  it.each([['/help','How can we help?'],['/privacy','Your information, explained.'],['/terms','About this collection.'],['/contact','Let’s talk about your next home.']])('renders %s', (path,title) => {
    mount(path)
    expect(screen.getByRole('heading',{name:title})).toBeInTheDocument()
  })
  it('has the requested developer attribution and safe direct email fallback', async () => {
    mount('/contact')
    expect(screen.getByText('Developed by')).toBeInTheDocument()
    expect(screen.getByRole('link',{name:'Emmanuel Phanuel'})).toHaveAttribute('href','https://github.com/Itzemmanuel')
    await waitFor(()=>expect(screen.getByRole('button',{name:'Send enquiry'})).toBeDisabled())
    expect(screen.getByRole('link',{name:'Email directly'}).getAttribute('href')).toContain('mailto:itzemmanuelmurye@gmail.com')
    expect(screen.queryByRole('link',{name:'Login'})).not.toBeInTheDocument()
  })
  it('shows confirmed success for a valid enquiry and preserves fields on failure', async () => {
    const user = userEvent.setup()
    fetch.mockResolvedValueOnce({ok:true,json:async()=>({ready:true})})
    mount('/property/1')
    await user.type(screen.getByLabelText('Name'),'Test Visitor')
    await user.type(screen.getByLabelText('Email'),'visitor@example.com')
    await user.click(screen.getByRole('checkbox'))
    fetch.mockResolvedValueOnce({ok:false,json:async()=>({error:'Please try again later.'})})
    await user.click(screen.getByRole('button',{name:'Send enquiry'}))
    expect(await screen.findByRole('alert')).toHaveTextContent('Please try again later.')
    expect(screen.getByLabelText('Name')).toHaveValue('Test Visitor')
    fetch.mockResolvedValueOnce({ok:true,json:async()=>({ok:true})})
    await user.click(screen.getByRole('button',{name:'Send enquiry'}))
    expect(await screen.findByRole('status')).toHaveTextContent('Your enquiry has been sent')
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(JSON.parse(fetch.mock.calls.at(-1)[1].body).propertyId).toBe(1)
  })
})
