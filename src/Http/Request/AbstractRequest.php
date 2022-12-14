<?php

namespace App\Http\Request;

use App\Http\Exception\Request\ConstraintViolationsException;
use DigitalRevolution\SymfonyRequestValidation\AbstractValidatedRequest;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\ConstraintViolationListInterface;

abstract class AbstractRequest extends AbstractValidatedRequest
{
    protected function handleViolations(ConstraintViolationListInterface $violationList): ?Response
    {
        throw new ConstraintViolationsException($violationList);
    }
}
