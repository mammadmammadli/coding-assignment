import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import Modal from "../components/Modal"
import Icon from "../components/Icons";
import Movies from "../components/Movies/Movies";
import { renderWithProviders } from "./utils";
import { moviesMock } from "./movies.mocks";
import MovieWrapper from "../components/Movies/MoviesWrapper";
import ModalLayer from "../components/Modal/ModalLayer";
import ModalBody from "../components/Modal/ModalBody";

describe('components', () => {
  describe('Modal', () => {
    const onClose = jest.fn();

    it('render modal correctly', () => {
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal</div>
        </Modal>
      );

      expect(screen.getByTestId('modal')).toBeInTheDocument()
    });

    it('does not render modal if isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={onClose}>
          <div>Modal</div>
        </Modal>
      );

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    })

    it('closed modal correctly', async () => {
      const onClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal</div>
        </Modal>
      );
      const closeButton = screen.getByTestId('close-modal-button');

      await waitFor(() => {
        expect(closeButton).toBeInTheDocument()
      })

      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    })

    it('closes modal on escape key press', async () => {
      const onClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal</div>
        </Modal>
      );

      const modal = screen.getByTestId('modal');

      await waitFor(() => {
        expect(modal).toBeInTheDocument()
      })

      fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' })

      expect(onClose).toHaveBeenCalledTimes(1)
    });

    it('does not close modal on escape key press if isOpen is false', async () => {
      const onClose = jest.fn();

      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal</div>
        </Modal>
      );

      const modal = screen.getByTestId('modal');

      fireEvent.keyDown(modal, { key: 'Enter', code: 'Enter' })

      expect(onClose).toHaveBeenCalledTimes(0)
    });

    it('it will close modal if it`s clicked outside of body', () => {
      const onClick = jest.fn();
      const onClose = jest.fn();

      render(
        <ModalLayer>
          <button data-testid="random-click" onClick={onClick}>Click</button>
          <ModalBody onClose={onClose}>
            Body
          </ModalBody>
        </ModalLayer>
      )

      fireEvent.click(screen.getByTestId('random-click'));

      expect(onClose).toHaveBeenCalledTimes(1);
    })
  })

  describe('Icon', () => {
    it('renders icon correctly', () => {
      render(<Icon name="close" />)

      expect(screen.getByTestId('close-icon')).toBeInTheDocument()
    });

    it('renders null if no icon name is passed', () => {
      render(<Icon />)

      expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
    });
  });

  describe('Movies', () => {
    it('renders movies correctly', () => {
      render(<Movies />)

      expect(screen.getByTestId('movies')).toBeInTheDocument()
    });

    it('renders null if no movies are passed', () => {
      render(<Movies />)

      expect(screen.queryByTestId('movies-empty')).toBeInTheDocument()
    });

    it('renders Movie component if movies are passed', () => {
      renderWithProviders(<Movies movies={moviesMock} />)

      waitFor(() => {
        expect(screen.getAllByTestId('movie-card')).toBeInTheDocument()
      })
    });

    it('renders Movie wrapper correctly', () => {
      renderWithProviders(<MovieWrapper />);

      waitFor(() => {
        expect(screen.getByTestId('movies-wrapper')).toBeInTheDocument()
      })
    });
  })
})