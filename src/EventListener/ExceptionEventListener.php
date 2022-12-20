<?php

namespace App\EventListener;

use App\Exception\Request\ConstraintViolationsException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class ExceptionEventListener
{
    private const CONTENT_TYPE_HEADER_KEY = 'Content-Type';
    private const APPLICATION_JSON_HEADER_VALUE = 'application/json';

    public function onKernelException(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        // TODO: Add log

        // TODO: Add 500 page
        $response = $this->isJson($event)
            ? new JsonResponse($this->makeContent($exception))
            : new Response($exception->getMessage());

        if ($exception instanceof HttpExceptionInterface) {
            $response->setStatusCode($exception->getStatusCode());
            $response->headers->replace($exception->getHeaders());
        } else {
            $response->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        $event->setResponse($response);
    }

    private function isJson(ExceptionEvent $event): bool
    {
        return self::APPLICATION_JSON_HEADER_VALUE === $event->getRequest()->headers->get(self::CONTENT_TYPE_HEADER_KEY);
    }

    private function makeContent(\Throwable $exception): array
    {
        $result = [
            'message' => $exception->getMessage(),
            'code' => $exception->getCode(),
            'errors' => [],
        ];

        if ($exception instanceof ConstraintViolationsException) {
            foreach ($exception->getConstraintViolationList() as $constraintViolation) {
                $result['errors'][] = [
                    'path' => $constraintViolation->getPropertyPath(),
                    'code' => $constraintViolation->getCode(),
                    'message' => $constraintViolation->getMessage(),
                ];
            }
        }

        return $result;
    }
}